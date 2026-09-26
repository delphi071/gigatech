"""Extract bounded local document evidence without changing source documents."""
from pathlib import Path
import struct, zlib, json, re
from pdfminer.high_level import extract_text
from pdfminer.pdfpage import PDFPage

OUT=Path(__file__).resolve().parent
SOURCE=OUT.parents[2]/'docs'/'1.홈페이지 제작관련'

def read_cfb(path):
    data=path.read_bytes()
    if data[:8]!=bytes.fromhex('D0CF11E0A1B11AE1'): raise ValueError('Not CFB')
    ss=1<<struct.unpack_from('<H',data,30)[0]
    ms=1<<struct.unpack_from('<H',data,32)[0]
    def sector(n): return data[(n+1)*ss:(n+2)*ss]
    fat_sectors=list(struct.unpack_from('<109I',data,76))
    fat_sectors=[n for n in fat_sectors if n<0xfffffffa]
    dif=struct.unpack_from('<I',data,68)[0]
    for _ in range(struct.unpack_from('<I',data,72)[0]):
        sec=struct.unpack('<'+'I'*(ss//4),sector(dif)); fat_sectors.extend(n for n in sec[:-1] if n<0xfffffffa); dif=sec[-1]
    fat=[]
    for n in fat_sectors: fat.extend(struct.unpack('<'+'I'*(ss//4),sector(n)))
    def chain(start, table):
        seen=set(); out=[]
        while start<0xfffffffa:
            if start in seen or start>=len(table): raise ValueError('Invalid CFB chain')
            seen.add(start); out.append(start); start=table[start]
        return out
    def big(start): return b''.join(sector(n) for n in chain(start,fat))
    directory=big(struct.unpack_from('<I',data,48)[0])
    entries=[]
    for n in range(0,len(directory),128):
        raw=directory[n:n+128]
        ln=struct.unpack_from('<H',raw,64)[0]
        if not ln: continue
        entries.append(dict(name=raw[:ln-2].decode('utf-16le'),type=raw[66],start=struct.unpack_from('<I',raw,116)[0],size=struct.unpack_from('<Q',raw,120)[0]))
    root=next(e for e in entries if e['type']==5)
    mini_stream=big(root['start'])[:root['size']]
    minifat_raw=big(struct.unpack_from('<I',data,60)[0])
    minifat=list(struct.unpack('<'+'I'*(len(minifat_raw)//4),minifat_raw))
    streams={}
    for e in entries:
        if e['type']!=2: continue
        if e['size']<struct.unpack_from('<I',data,56)[0]:
            value=b''.join(mini_stream[n*ms:(n+1)*ms] for n in chain(e['start'],minifat))
        else: value=big(e['start'])
        streams[e['name']]=value[:e['size']]
    return streams

evidence={}
for p in SOURCE.rglob('*.pdf'):
    t=extract_text(p)
    with p.open('rb') as f: pages=sum(1 for _ in PDFPage.get_pages(f))
    evidence['pdf']=dict(source=p.relative_to(OUT.parents[2]).as_posix(),pages=pages,
                         chars=len(t),institution='덕성여자대학교' if '덕성여자대학교' in t else None,
                         period='2023' if '2023' in t else None)
    (OUT/'pdf_text.txt').write_text(t,encoding='utf-8')
for p in SOURCE.rglob('*.hwp'):
    streams=read_cfb(p)
    header=streams['FileHeader']
    compressed=bool(struct.unpack_from('<I',header,36)[0]&1)
    paragraphs=[]
    for name, raw in streams.items():
        if not name.startswith('Section'): continue
        body=zlib.decompress(raw,-15) if compressed else raw
        cursor=0
        while cursor+4<=len(body):
            info=struct.unpack_from('<I',body,cursor)[0]; cursor+=4
            tag=info&1023; size=(info>>20)&4095
            if size==4095: size=struct.unpack_from('<I',body,cursor)[0]; cursor+=4
            payload=body[cursor:cursor+size]; cursor+=size
            if tag==67:
                text=payload.decode('utf-16le',errors='replace')
                text=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',text)
                paragraphs.append(text)
    full='\n'.join(paragraphs)
    preview=streams.get('PrvText',b'').decode('utf-16le',errors='replace')
    # Keep contact details out of derived material and tool output.
    redacted=re.sub(r'\b0\d{1,2}[-. ]?\d{3,4}[-. ]?\d{4}\b','[연락처 비공개]',preview or full)
    redacted=re.sub(r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}','[이메일 비공개]',redacted,flags=re.I)
    (OUT/'hwp_text_redacted.txt').write_text(redacted,encoding='utf-8')
    if streams.get('PrvImage',b'').startswith(b'\x89PNG'):
        (OUT/'hwp_preview.png').write_bytes(streams['PrvImage'])
    evidence['hwp']=dict(source=p.relative_to(OUT.parents[2]).as_posix(),streams=list(streams),compressed=compressed,
                         paragraphs=len(paragraphs),phone_candidate_match='032-710-1413' in full,
                         bucheon_match='부천' in full,gigatech_match='기가테크' in full)
    print(redacted)
(OUT/'document_evidence.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(evidence,ensure_ascii=False,indent=2))
