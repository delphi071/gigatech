from pathlib import Path
import json
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / 'docs'
out = {'texts': {}, 'homepage_public_hosts': [], 'code_check': {}}
for p in DOCS.rglob('*.txt'):
    raw = p.read_bytes()
    for enc in ('utf-8-sig', 'cp949'):
        try:
            value = raw.decode(enc)
            break
        except UnicodeDecodeError:
            continue
    else:
        value = raw.decode('utf-8', errors='replace')
    if p.name == '홈페이지.txt':
        for link in re.findall(r'https?://[^\s<>]+', value):
            parsed = urlsplit(link)
            if parsed.hostname:
                out['homepage_public_hosts'].append(parsed.scheme + '://' + parsed.hostname)
        out['homepage_text_exists'] = True
        continue
    if p.name not in ('요청사항.txt', '인사말.txt', '1.txt'):
        continue
    lines = []
    skip_next = False
    for num, line in enumerate(value.splitlines(), 1):
        if re.search(r'password|passwd|token|secret|비밀번호|비번|패스워드|아이디|\bid\s*[:=]', line, re.I):
            lines.append({'line': num, 'text': '[credential-related line omitted]'})
            skip_next = True
        elif skip_next and line.strip():
            lines.append({'line': num, 'text': '[line after credential label omitted]'})
            skip_next = False
        else:
            lines.append({'line': num, 'text': line})
    out['texts'][str(p.relative_to(ROOT))] = {'encoding': enc, 'lines': lines}
for name in ('TECH_STACK_CONFIG.md', 'TEAM_DESIGN_SPEC.md', 'TEAM_TECH_SPEC.md'):
    out['code_check'][name] = (DOCS / name).exists()
out['root_entries'] = sorted(p.name for p in ROOT.iterdir())
Path(__file__).with_name('inspection.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(out, ensure_ascii=True, indent=2))
