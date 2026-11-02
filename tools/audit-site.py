"""Dependency-free structural checks for this five-page coursework site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
ROOT = Path(__file__).resolve().parent.parent
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path=path; self.nodes=[]; self.stack=[]; self.errors=[]
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag,dict(attrs)))
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag: self.errors.append('Mismatched closing tag: '+tag)
        else: self.stack.pop()
pages={p.name:Page(p) for p in ROOT.glob('*.html')}
errors=[]; reference_count=0
for name,page in pages.items():
    errors.extend(name+': '+e for e in page.errors)
    if page.stack: errors.append(name+': Unclosed tags')
    ids=[a['id'] for _,a in page.nodes if 'id' in a]
    if len(ids)!=len(set(ids)): errors.append(name+': Duplicate IDs')
    for required in ['html','head','title','header','nav','main','footer','h1']:
        if sum(t==required for t,_ in page.nodes)!=1: errors.append(name+': Expected one '+required)
    if not any(t=='html' and a.get('lang')=='en' for t,a in page.nodes): errors.append(name+': Missing language')
    if sum(t=='a' and a.get('aria-current')=='page' for t,a in page.nodes)!=1: errors.append(name+': Current navigation missing')
    labels={a.get('for') for t,a in page.nodes if t=='label'}
    previous=0
    for tag,attrs in page.nodes:
        if tag in ['h1','h2','h3']:
            level=int(tag[1])
            if level>previous+1: errors.append(name+': Skipped heading level')
            previous=level
        if tag=='img' and not attrs.get('alt'): errors.append(name+': Image missing descriptive alt')
        if tag in ['input','textarea'] and attrs.get('id') not in labels: errors.append(name+': Unlabelled field')
        for description in attrs.get('aria-describedby','').split():
            if description not in ids: errors.append(name+': Broken description reference '+description)
        if tag=='th' and attrs.get('scope') not in ['row','col']: errors.append(name+': Table header missing scope')
        for key in ['src','href']:
            value=attrs.get(key)
            if value is None: continue
            link=urlsplit(value)
            if link.scheme: continue
            reference_count+=1
            destination=ROOT/unquote(link.path) if link.path else page.path
            if not destination.is_file(): errors.append(name+': Missing file '+value)
            if link.fragment and destination.name in pages:
                target_ids={a.get('id') for _,a in pages[destination.name].nodes}
                if unquote(link.fragment) not in target_ids: errors.append(name+': Broken fragment '+value)
            if value=='#': errors.append(name+': Empty simulated link')
def luminance(hexcode):
    rgb=[int(hexcode[i:i+2],16)/255 for i in (0,2,4)]
    return sum(c*w for c,w in zip([v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb],[.2126,.7152,.0722]))
def contrast(a,b):
    a,b=sorted([luminance(a),luminance(b)]);return (b+.05)/(a+.05)
ratios={}
for label,fg,bg,minimum in [('body','f8fafc','070b14',4.5),('muted','94a3b8','070b14',4.5),('accent','38bdf8','070b14',4.5),('errors','ffb6ab','0d1422',4.5),('field borders','52657e','080f1b',3)]:
    ratio=contrast(fg,bg);ratios[label]=round(ratio,2)
    if ratio<minimum: errors.append(label+': Contrast below target')
assert len(pages)==5
report={'pages':len(pages),'local_references':reference_count,'contrast_ratios':ratios,'errors':errors}
(ROOT/'tmp/audit').mkdir(parents=True,exist_ok=True)
(ROOT/'tmp/audit/source-audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
