from html.parser import HTMLParser
from pathlib import Path
import json

class Reader(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_main = False
        self.skip = 0
        self.text = []
        self.fields = []
        self.images = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        item = dict(attrs)
        if tag == 'main': self.in_main = True
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'a': self.links.append(item.get('href', ''))
        if tag == 'img': self.images.append({'src': item.get('src'), 'alt': item.get('alt')})
        if self.in_main and tag in ('form', 'input', 'select', 'textarea', 'button'):
            self.fields.append({'tag': tag, **item})
    def handle_endtag(self, tag):
        if tag == 'main': self.in_main = False
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
    def handle_data(self, value):
        if self.in_main and not self.skip and value.strip(): self.text.append(value.strip())

base = Path(__file__).parent
records = json.loads((base/'pages.json').read_text(encoding='utf-8'))
reports = []
for page in records:
    reader = Reader()
    reader.feed(page.get('html',''))
    result = {'route':page['route'],'status':page.get('status'), 'text':reader.text,'fields':reader.fields,'images':reader.images,'links':reader.links}
    reports.append(result)
    print(json.dumps({**result,'fields':[{k:v for k,v in f.items() if k!='class'} for f in reader.fields],'links':list(dict.fromkeys(reader.links))},ensure_ascii=False))
(base/'http-inspection.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
