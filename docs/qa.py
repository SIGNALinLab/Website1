from pathlib import Path
import json,re,sys,subprocess,shutil
root=Path(__file__).resolve().parents[1];errors=[]
for f in (root/'assets/data').glob('*.json'):
 try:json.loads(f.read_text())
 except Exception as e:errors.append(f'Invalid JSON {f}: {e}')
for f in root.glob('*.html'):
 t=f.read_text()
 for ref in re.findall(r'(?:href|src)=["\']([^"\']+)',t):
  if ref.startswith(('http://','https://','mailto:','#','data:')):continue
  if ref and not (root/ref.split('?')[0].split('#')[0]).exists():errors.append(f'Broken local reference in {f.name}: {ref}')
if shutil.which('node'):
 for f in (root/'assets/js').glob('*.js'):
  r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
  if r.returncode:errors.append('JS syntax '+f.name)
css=(root/'assets/css/styles.css').read_text()
if 'Unified luminous banner color across every page' not in css:errors.append('Unified banner marker missing')
if re.search(r'body\[data-page=.*?\.page-hero\{--hero-',css):errors.append('Page-specific banner hue overrides remain')
if not (root/'.nojekyll').exists():errors.append('.nojekyll missing')
if errors:print('\n'.join('ERROR: '+e for e in errors));sys.exit(1)
print('QA static checks passed')