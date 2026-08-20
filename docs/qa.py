from pathlib import Path
import json,re,sys,subprocess,shutil
root=Path(__file__).resolve().parents[1];errors=[]
for f in (root/'assets/data').glob('*.json'):
 try: json.loads(f.read_text(encoding='utf-8'))
 except Exception as e: errors.append(f'Invalid JSON {f}: {e}')
for f in root.glob('*.html'):
 t=f.read_text(encoding='utf-8')
 for attr in re.findall(r'(?:href|src)=["\']([^"\']+)',t):
  if attr.startswith(('http://','https://','mailto:','#','data:')) or not attr: continue
  p=f.parent/attr.split('?')[0].split('#')[0]
  if not p.exists(): errors.append(f'Broken local reference in {f.name}: {attr}')
if shutil.which('node'):
 for f in (root/'assets/js').glob('*.js'):
  r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
  if r.returncode: errors.append(f'JS syntax {f.name}: {r.stderr.strip()}')
proj=json.loads((root/'assets/data/projects.json').read_text())
if len(proj['groups']['gpo']['records'])!=3: errors.append('Expected 3 GPO project records')
if len(proj['groups']['sdp']['records'])!=2: errors.append('Expected 2 SDP records')
for group in proj['groups'].values():
 for p in group['records']:
  media=root/p['media']['src']
  if not media.exists(): errors.append(f'Missing project media: {media}')
main=(root/'assets/js/main.js').read_text()
if 'GPO Projects' not in main or 'Senior Design Projects' not in main: errors.append('Projects dropdown submenu missing')
pub=(root/'assets/js/publications.js').read_text()
if '<strong>${m}</strong>' not in pub: errors.append('Abdulaziz Alorf bolding logic missing')
for marker in ['PRIVATE KEY','BEGIN RSA PRIVATE KEY','service_account']:
 for f in root.rglob('*'):
  if f.resolve()==Path(__file__).resolve(): continue
  if f.is_file() and f.suffix.lower() not in {'.png','.jpg','.jpeg','.gif','.ico','.webp'}:
   try:
    if marker in f.read_text(encoding='utf-8',errors='ignore'): errors.append(f'Potential secret marker in {f}')
   except: pass
if errors:
 print('\n'.join('ERROR: '+e for e in errors));sys.exit(1)
print('QA static checks passed')
