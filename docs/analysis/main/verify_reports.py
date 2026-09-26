"""Verify analysis artifacts and original-file preservation; no product tests."""
from pathlib import Path
from datetime import datetime, timedelta, timezone
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[3]
INVENTORY = ROOT / 'docs/analysis/SOURCE_INVENTORY.json'
REPORTS = [
    'docs/TEAM_PLAN.md',
    'docs/TEAM_STATUS.md',
    'docs/WEBSITE_ANALYSIS_REPORT.md',
    'docs/analysis/MENU_CONTENT_AUDIT.md',
    'docs/analysis/ASSET_AUDIT.md',
    'docs/analysis/BUILD_REQUIREMENTS.md',
    'docs/analysis/main/EXTERNAL_RESEARCH.md',
]


def main():
    baseline = json.loads(INVENTORY.read_text(encoding='utf-8'))
    failures = []
    source_files = {p.relative_to(ROOT).as_posix() for p in (ROOT / baseline['source_root']).rglob('*') if p.is_file()}
    expected_files = {record['path'] for record in baseline['files']}
    if source_files != expected_files:
        failures.append({'source_file_set_changed': sorted(source_files.symmetric_difference(expected_files))})
    for record in baseline['files']:
        path = ROOT / record['path']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != record['sha256']:
            failures.append({'original_changed_or_missing': record['path']})
    inspected = []
    local_link_count = 0
    for relative in REPORTS:
        path = ROOT / relative
        if not path.is_file():
            failures.append({'report_missing': relative})
            continue
        content = path.read_text(encoding='utf-8-sig')
        if '\ufffd' in content:
            failures.append({'replacement_character': relative})
        if len(content.strip()) < 100:
            failures.append({'empty_report': relative})
        for target in re.findall(r'\]\(([^)]+)\)', content):
            target = target.strip('<>')
            if target.startswith(('https://', 'http://', '#', 'mailto:')):
                continue
            local_link_count += 1
            destination = target.split('#', 1)[0]
            if not (path.parent / destination).exists():
                failures.append({'broken_local_link': target, 'source': relative})
        inspected.append({'path': relative, 'lines': len(content.splitlines())})
    result = {
        'checked_at': datetime.now(timezone(timedelta(hours=9))).isoformat(timespec='seconds'),
        'status': 'pass' if not failures else 'fail',
        'scope': 'analysis reports and original preservation only; no application tests',
        'original_files_checked': len(baseline['files']),
        'local_links_checked': local_link_count,
        'reports': inspected,
        'failures': failures,
    }
    (ROOT / 'docs/analysis/main/verification.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(bool(failures))


if __name__ == '__main__':
    main()
