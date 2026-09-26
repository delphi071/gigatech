"""Read-only inventory of original website materials; derived output only."""
from pathlib import Path
from collections import Counter, defaultdict
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / 'docs' / '1.홈페이지 제작관련'
OUTPUT = ROOT / 'docs' / 'analysis' / 'SOURCE_INVENTORY.json'


def decode_text(raw):
    for encoding in ('utf-8-sig', 'cp949', 'utf-16'):
        try:
            return raw.decode(encoding), encoding
        except UnicodeError:
            continue
    return raw.decode('utf-8', errors='replace'), 'utf-8-replacement'


def main():
    records = []
    groups = defaultdict(list)
    for path in sorted(SOURCE.rglob('*')):
        if not path.is_file():
            continue
        raw = path.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        relative = path.relative_to(ROOT).as_posix()
        record = {'path': relative, 'bytes': len(raw), 'extension': path.suffix.lower(), 'sha256': digest}
        records.append(record)
        groups[digest].append(relative)
    result = {
        'source_root': SOURCE.relative_to(ROOT).as_posix(),
        'file_count': len(records),
        'total_bytes': sum(record['bytes'] for record in records),
        'extension_counts': dict(sorted(Counter(record['extension'] for record in records).items())),
        'exact_duplicate_groups': [paths for paths in groups.values() if len(paths) > 1],
        'files': records,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: value for key, value in result.items() if key != 'files'}, ensure_ascii=False, indent=2))
    for path in sorted(SOURCE.rglob('*.txt')):
        value, encoding = decode_text(path.read_bytes())
        print('\nTEXT', path.relative_to(ROOT).as_posix(), 'encoding=' + encoding)
        # Avoid printing possible credentials from historic handoff documents.
        if re.search(r'비밀번호|비번|password|passwd|\bpw\b|아이디|\bid\s*:', value, re.I):
            print('[credential-like content omitted; only public URL hosts shown]')
            from urllib.parse import urlsplit
            hosts = sorted({urlsplit(url).hostname for url in re.findall(r'https?://[^\s<>\"]+', value)})
            print(json.dumps(hosts, ensure_ascii=False))
        else:
            print(value[:9000])


if __name__ == '__main__':
    main()
