from pathlib import Path
import json
import re
import shutil
import subprocess
import sys
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
errors = []

# JSON data must parse.
for f in sorted((root / 'assets/data').glob('*.json')):
    try:
        json.loads(f.read_text(encoding='utf-8'))
    except Exception as exc:
        errors.append(f'JSON {f.relative_to(root)}: {exc}')

# Static HTML structure and local references.
for f in sorted(root.glob('*.html')):
    soup = BeautifulSoup(f.read_text(encoding='utf-8'), 'html.parser')
    if not soup.title or not soup.title.get_text(strip=True):
        errors.append(f'{f.name}: missing title')
    desc = soup.find('meta', attrs={'name': 'description'})
    if not desc or not desc.get('content', '').strip():
        errors.append(f'{f.name}: missing meta description')
    if len(soup.find_all('h1')) != 1:
        errors.append(f'{f.name}: expected exactly one h1')
    ids = [el['id'] for el in soup.find_all(id=True)]
    if len(ids) != len(set(ids)):
        errors.append(f'{f.name}: duplicate id')
    for img in soup.find_all('img'):
        if img.get('alt') is None:
            errors.append(f'{f.name}: image missing alt')
    for iframe in soup.find_all('iframe'):
        if not iframe.get('title'):
            errors.append(f'{f.name}: iframe missing title')
    for tag in soup.find_all(['a', 'img', 'script', 'link']):
        attr = 'href' if tag.name in ('a', 'link') else 'src'
        ref = tag.get(attr)
        if not ref or ref.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:', 'javascript:')):
            continue
        rel = ref.split('?', 1)[0].split('#', 1)[0]
        if rel and not (root / rel).exists():
            errors.append(f'{f.name}: missing local reference {ref}')

# JS syntax.
if shutil.which('node'):
    for f in sorted((root / 'assets/js').glob('*.js')):
        proc = subprocess.run(['node', '--check', str(f)], capture_output=True, text=True)
        if proc.returncode:
            errors.append(f'{f.relative_to(root)}: {proc.stderr.strip()}')

# Requested banner-color invariant: all heroes inherit the homepage palette.
css = (root / 'assets/css/styles.css').read_text(encoding='utf-8')
expected = {
    '--hero-a': '#edf8ff',
    '--hero-b': '#ecfbf7',
    '--hero-c': '#f8fbff',
    '--hero-accent': '#2b6fbd',
    '--hero-accent-2': '#18b8b6',
}
hero_rule = re.search(r'\.hero,\.page-hero\{([^}]+)\}', css)
if not hero_rule:
    errors.append('shared .hero,.page-hero palette rule missing')
else:
    body = hero_rule.group(1).lower()
    for prop, value in expected.items():
        if f'{prop}:{value}' not in body:
            errors.append(f'shared hero palette mismatch for {prop}')
# No page-specific hero palette may override the shared palette.
for prop in expected:
    matches = [m.start() for m in re.finditer(re.escape(prop) + r'\s*:', css)]
    # One in :root and one in the shared hero rule is expected; anything else can drift page colors.
    if len(matches) != 2:
        errors.append(f'{prop} declared {len(matches)} times; expected exactly 2 shared declarations')

# Data completeness/invariants from the preserved build.
projects = json.loads((root / 'assets/data/projects.json').read_text(encoding='utf-8'))
if len(projects.get('groups', {}).get('gpo', {}).get('records', [])) != 3:
    errors.append('expected 3 GPO records')
if len(projects.get('groups', {}).get('sdp', {}).get('records', [])) != 2:
    errors.append('expected 2 SDP records')
pubs = json.loads((root / 'assets/data/publications.json').read_text(encoding='utf-8'))
if len(pubs.get('records', [])) != 15:
    errors.append('expected 15 publication records')
if '<strong>${m}</strong>' not in (root / 'assets/js/publications.js').read_text(encoding='utf-8'):
    errors.append('publication owner-author bolding missing')

# File manifest exactness.
manifest_path = root / 'docs/FILE_MANIFEST.txt'
if manifest_path.exists():
    actual = sorted(str(p.relative_to(root)).replace('\\', '/') for p in root.rglob('*') if p.is_file())
    listed = sorted(x.strip() for x in manifest_path.read_text(encoding='utf-8').splitlines() if x.strip())
    if actual != listed:
        errors.append('docs/FILE_MANIFEST.txt does not exactly match repository files')

if errors:
    print('\n'.join('ERROR: ' + e for e in errors))
    sys.exit(1)
print('QA static checks passed')
