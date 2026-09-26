"""Read-only XLSX evidence extraction for the website content analysis."""
from pathlib import Path
from xml.etree import ElementTree as ET
import json
import hashlib
import posixpath
import re
import zipfile

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "docs" / "1.홈페이지 제작관련"
OUT = Path(__file__).parent
NS = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
PKG = "{http://schemas.openxmlformats.org/package/2006/relationships}"
SENSITIVE = re.compile(r"비밀번호|패스워드|password|passwd|pwd\s*[:=]|ftp\s*[:=]", re.I)

def safe(value):
    return "[민감값 포함 셀: 출력 제외]" if SENSITIVE.search(value) else value

def main():
    results = []
    for path in sorted(SOURCE.glob("*.xlsx")):
        if path.name.startswith("~$"):
            continue
        with zipfile.ZipFile(path) as archive:
            wb = ET.fromstring(archive.read("xl/workbook.xml"))
            rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
            targets = {x.get("Id"): posixpath.normpath(posixpath.join("xl", x.get("Target")))
                       for x in rels.findall(PKG + "Relationship")}
            strings = []
            if "xl/sharedStrings.xml" in archive.namelist():
                strings = ["".join(x.itertext()) for x in ET.fromstring(archive.read("xl/sharedStrings.xml")).findall("s:si", NS)]
            core = ET.fromstring(archive.read("docProps/core.xml"))
            modified = core.find("{http://purl.org/dc/terms/}modified")
            result = {"file": path.relative_to(ROOT).as_posix(),
                      "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                      "zip_integrity": "pass" if archive.testzip() is None else "fail",
                      "document_modified_metadata": modified.text if modified is not None else None,
                      "sheets": [], "comments": []}
            for sheet in wb.findall("s:sheets/s:sheet", NS):
                target = targets[sheet.get("{" + NS["r"] + "}id")].lstrip("/")
                root = ET.fromstring(archive.read(target))
                data = {"name": sheet.get("name"), "state": sheet.get("state", "visible"),
                        "dimension": root.find("s:dimension", NS).get("ref"), "cells": [],
                        "merges": [x.get("ref") for x in root.findall("s:mergeCells/s:mergeCell", NS)],
                        "hyperlinks": [dict(x.attrib) for x in root.findall("s:hyperlinks/s:hyperlink", NS)]}
                for cell in root.findall("s:sheetData/s:row/s:c", NS):
                    value_node = cell.find("s:v", NS)
                    value = value_node.text or "" if value_node is not None else ""
                    if cell.get("t") == "s":
                        value = strings[int(value)]
                    elif cell.get("t") == "inlineStr":
                        value = "".join(cell.find("s:is", NS).itertext())
                    formula = cell.find("s:f", NS)
                    if value or formula is not None:
                        data["cells"].append({"cell": cell.get("r"), "value": safe(value),
                                              **({"formula": safe(formula.text or "")} if formula is not None else {})})
                result["sheets"].append(data)
            for entry in archive.namelist():
                if re.fullmatch(r"xl/comments\d+\.xml", entry):
                    root = ET.fromstring(archive.read(entry))
                    result["comments"].extend({"part": entry, "cell": x.get("ref"), "text": safe("".join(x.find("s:text", NS).itertext()))}
                                              for x in root.findall("s:commentList/s:comment", NS))
            results.append(result)
    (OUT / "workbooks_extracted.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    for book in results:
        print("\nFILE", book["file"])
        for sheet in book["sheets"]:
            print("SHEET", sheet["name"], "STATE", sheet["state"], "DIM", sheet["dimension"], "CELLS", len(sheet["cells"]))
            print("MERGES", len(sheet["merges"]), "(full ranges saved in JSON)")
            for c in sheet["cells"]:
                print(c["cell"], repr(c["value"]))
        for comment in book["comments"]:
            print("COMMENT", comment)

if __name__ == "__main__":
    main()
