from pathlib import Path
import json,re,sys,subprocess,shutil
root=Path(__file__).resolve().parents[1];errors=[]
for f in (root/'assets/data').glob('*.json'):
 try:json.loads(f.read_text())
 except Exception as e:errors.append(f'Invalid JSON {f}: {e}')
for f in root.glob('*.html'):
 t=f.read_text()
 for a in re.findall(r"(?:href|src)=[\"']([^\"']+)",t):
  if not a or a.startswith(('http://','https://','mailto:','#','data:')):continue
  if not (f.parent/a.split('?')[0].split('#')[0]).exists():errors.append(f'Broken local reference {f.name}: {a}')
if shutil.which('node'):
 for f in (root/'assets/js').glob('*.js'):
  r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
  if r.returncode:errors.append(f'JS syntax {f.name}: {r.stderr}')
d=json.loads((root/'assets/data/projects.json').read_text())
if len(d['groups']['gpo']['records'])!=3:errors.append('Expected 3 GPO records')
if len(d['groups']['sdp']['records'])!=2:errors.append('Expected 2 SDP records')
for g in d['groups'].values():
 for p in g['records']:
  if not (root/p['media']['src']).exists():errors.append('Missing media '+p['media']['src'])
if 'nav-dropdown' in (root/'assets/js/main.js').read_text():errors.append('Projects dropdown unexpectedly present')
if '<strong>${m}</strong>' not in (root/'assets/js/publications.js').read_text():errors.append('Publication owner bolding missing')
if errors:print('\n'.join('ERROR: '+e for e in errors));sys.exit(1)
print('QA static checks passed')