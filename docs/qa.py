from pathlib import Path
import json,re,sys
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
errors=[]
for f in (root/'assets/data').glob('*.json'):
    try: json.loads(f.read_text(encoding='utf-8'))
    except Exception as e: errors.append(f'Invalid JSON {f}: {e}')
# Local href/src checks (ignore external, anchors, mailto)
for f in root.glob('*.html'):
    t=f.read_text(encoding='utf-8')
    for attr in re.findall(r'(?<![-\w])(?:href|src)=["\']([^"\']+)',t):
        if attr.startswith(('http://','https://','mailto:','#','data:')): continue
        p=(f.parent/attr.split('?')[0].split('#')[0])
        if attr and not p.exists(): errors.append(f'Broken local reference in {f.name}: {attr}')

# Data-driven recommendation links: public local files must exist.
try:
    people=json.loads((root/'assets/data/people.json').read_text(encoding='utf-8'))
    for person in people.get('records',[]):
        rec=person.get('recommendation') or {}
        url=rec.get('url','')
        if rec.get('public') and url and not url.startswith(('http://','https://')):
            target=(root/url.split('?')[0].split('#')[0])
            if not target.exists(): errors.append(f"Broken public alumni recommendation for {person.get('name','unknown')}: {url}")
except Exception as e: errors.append(f'People recommendation validation failed: {e}')

# JS syntax via node if available
import shutil,subprocess
if shutil.which('node'):
    for f in (root/'assets/js').glob('*.js'):
        r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
        if r.returncode: errors.append(f'JS syntax {f.name}: {r.stderr.strip()}')
# Acceptance-specific text checks
pt=(root/'assets/js/publications.js').read_text(encoding='utf-8')
if '<strong>${m}</strong>' not in pt: errors.append('Publication owner-bold logic missing')
if not (root/'.nojekyll').exists(): errors.append('.nojekyll missing')
for secret in ['PRIVATE KEY','BEGIN RSA PRIVATE KEY','service_account']:
    for f in root.rglob('*'):
        if f.is_file() and f != Path(__file__).resolve() and f.suffix not in ['.png','.ico','.webp']:
            try:
                if secret in f.read_text(encoding='utf-8',errors='ignore'): errors.append(f'Potential secret marker in {f}')
            except: pass
if errors:
    print('\n'.join('ERROR: '+e for e in errors));sys.exit(1)
print('QA static checks passed')
