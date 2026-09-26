"""Read-only source audit. Derived inspection files are written beside this script."""
from pathlib import Path
from collections import defaultdict
from io import BytesIO
import hashlib, json, math, zipfile
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[2]
SOURCE = ROOT / 'docs' / '1.홈페이지 제작관련'
OUT.mkdir(exist_ok=True, parents=True)
images, archives, presentations = [], [], []
unique = {}
hashpaths = defaultdict(list)
font = ImageFont.truetype('C:/Windows/Fonts/malgun.ttf', 16)

def image_item(data, source, category):
    digest = hashlib.sha256(data).hexdigest()
    with Image.open(BytesIO(data)) as im:
        im.load()
        rec = dict(source=source, category=category, sha256=digest, bytes=len(data),
                   format=im.format, width=im.width, height=im.height, mode=im.mode,
                   transparency=('A' in im.getbands() or 'transparency' in im.info))
        if digest not in unique:
            ident = f'A{len(unique)+1:03d}'
            filename = ident + '.' + ('jpg' if im.format == 'JPEG' else 'png')
            target = OUT / 'images' / filename
            target.parent.mkdir(exist_ok=True)
            if im.format in ('JPEG', 'PNG'):
                target.write_bytes(data)
            else:
                im.convert('RGB').save(target)
            unique[digest] = dict(id=ident, derived=target.relative_to(ROOT).as_posix(),
                                  source=source, width=im.width, height=im.height)
        rec.update(unique[digest])
        rec['source'] = source
        images.append(rec)
        return rec

files = sorted(p for p in SOURCE.rglob('*') if p.is_file())
for p in files:
    hashpaths[hashlib.sha256(p.read_bytes()).hexdigest()].append(p.relative_to(ROOT).as_posix())
    if p.suffix.lower() in ('.png', '.jpg', '.jpeg'):
        image_item(p.read_bytes(), p.relative_to(ROOT).as_posix(), 'standalone')

for p in files:
    rel = p.relative_to(ROOT).as_posix()
    if p.suffix.lower() == '.zip':
        archive = dict(source=rel, crc_failure=None, entries=[])
        with zipfile.ZipFile(p) as z:
            archive['crc_failure'] = z.testzip()
            for i in z.infolist():
                if i.is_dir(): continue
                name = i.filename
                if not i.flag_bits & 0x800:
                    try: name = name.encode('cp437').decode('cp949')
                    except (UnicodeEncodeError, UnicodeDecodeError): pass
                data = z.read(i)
                digest = hashlib.sha256(data).hexdigest()
                entry = dict(name=name, bytes=len(data), sha256=digest,
                             exact_loose_matches=hashpaths.get(digest, []))
                if Path(name).suffix.lower() in ('.png', '.jpg', '.jpeg'):
                    entry['image_id'] = image_item(data, rel+'!/'+name, 'zip')['id']
                archive['entries'].append(entry)
        archives.append(archive)
    elif p.suffix.lower() in ('.pptx', '.xlsx') and not p.name.startswith('~$'):
        with zipfile.ZipFile(p) as z:
            for name in sorted(z.namelist()):
                if '/media/' in name and Path(name).suffix.lower() in ('.png', '.jpg', '.jpeg'):
                    image_item(z.read(name), rel+'!/'+name, p.suffix[1:]+'_embedded')
            if p.suffix.lower() == '.pptx':
                pres = dict(source=rel, slides=[])
                for name in sorted(z.namelist()):
                    if name.startswith('ppt/slides/slide') and name.endswith('.xml'):
                        tree=ET.fromstring(z.read(name))
                        ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
                        pres['slides'].append(dict(part=name, text=[t.text for t in tree.findall('.//a:t',ns) if t.text]))
                for name in ['docProps/core.xml','ppt/presentation.xml']:
                    if name in z.namelist(): pres[name] = z.read(name).decode('utf-8')
                if 'docProps/thumbnail.jpeg' in z.namelist():
                    pres['thumbnail_id']=image_item(z.read('docProps/thumbnail.jpeg'),rel+'!/docProps/thumbnail.jpeg','pptx_thumbnail')['id']
                presentations.append(pres)

for start in range(0,len(unique),18):
    group=list(unique.values())[start:start+18]
    tilew,tileh=460,310
    sheet=Image.new('RGB',(tilew*3,tileh*math.ceil(len(group)/3)), '#e5e7eb')
    draw=ImageDraw.Draw(sheet)
    for n, rec in enumerate(group):
        x,y=(n%3)*tilew,(n//3)*tileh
        with Image.open(ROOT/rec['derived']) as img:
            img=img.convert('RGBA'); img.thumbnail((tilew-20,tileh-66))
            base=Image.new('RGBA',img.size,'white'); base.alpha_composite(img)
            sheet.paste(base.convert('RGB'),(x+10,y+8))
        caption=f"{rec['id']} {rec['width']}x{rec['height']} {rec['source'].split('/')[-1]}"
        draw.text((x+10,y+tileh-55),caption[:43],font=font,fill='black')
        if len(caption)>43: draw.text((x+10,y+tileh-32),caption[43:86],font=font,fill='black')
    sheet.save(OUT/f'contact_sheet_{start//18+1:02d}.jpg',quality=90)

result=dict(images=images,unique_image_count=len(unique),archives=archives,presentations=presentations,
            exact_duplicate_loose_files=[v for k,v in hashpaths.items() if len(v)>1])
(OUT/'asset_inventory.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(dict(image_references=len(images),unique_images=len(unique),archives=len(archives),presentations=len(presentations)),ensure_ascii=False))
for a in archives: print('ZIP',a['source'], 'entries',len(a['entries']), 'new',sum(not e['exact_loose_matches'] for e in a['entries']))
for p in presentations: print('PPT',p['source'],p['slides'])
