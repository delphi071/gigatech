"""Verify extracted evidence, source preservation and baseline menu coverage."""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[3]
DATA = json.loads((Path(__file__).parent / "workbooks_extracted.json").read_text(encoding="utf-8"))
REPORT = (ROOT / "docs/analysis/MENU_CONTENT_AUDIT.md").read_text(encoding="utf-8")

assert len(DATA) == 3
assert sum(len(b["sheets"]) for b in DATA) == 6
for book in DATA:
    assert book["zip_integrity"] == "pass"
    assert hashlib.sha256((ROOT / book["file"]).read_bytes()).hexdigest() == book["sha256"]
    assert not Path(book["file"]).name.startswith("~$")

baseline = next(b for b in DATA if Path(b["file"]).name == "페이지 메뉴 구성안.xlsx")
sheet = baseline["sheets"][0]
cells = {c["cell"]: c["value"] for c in sheet["cells"]}
expected = {"C5": "회사소개", "E5": "주요업무", "G5": "장비보유현황",
            "C7": "인사말", "C8": "인증서", "E7": "기계설비 성능점검",
            "E8": "정보통신설비 성능점검", "G7": "점검장비"}
assert len(cells) == 14
assert len(sheet["merges"]) == 335
for cell, text in expected.items():
    assert cells[cell] == text
    assert cell in REPORT and text in REPORT
for cell in cells:
    assert cell in REPORT, f"Unreported baseline cell {cell}"

draft = next(b for b in DATA if Path(b["file"]).name == "디자인중.xlsx")
assert [len(s["cells"]) for s in draft["sheets"]] == [63, 20, 20, 20]
assert all(len(s["merges"]) == 349 for s in draft["sheets"])
assert len(draft["comments"]) == 1 and draft["comments"][0]["cell"] == "E19"
for foreign in draft["sheets"][1:]:
    addresses = {c["cell"] for c in foreign["cells"]}
    assert not ({"C19", "E19", "G19", "I19", "K19", "M19"} & addresses)

example = next(b for b in DATA if Path(b["file"]).name.startswith("(예시)"))
assert len(example["sheets"][0]["cells"]) == 126
assert len(example["sheets"][0]["merges"]) == 130
assert "별도 확장안" in REPORT and "타사 상호" in REPORT and "프레임" in REPORT
print("PASS: 3 source hashes; 6 sheets; 14 baseline cells; 3 main menus / 5 submenu entries; merges, comments and blank foreign menus verified.")
