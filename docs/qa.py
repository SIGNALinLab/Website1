from pathlib import Path
import json
import re
import shutil
import subprocess
import sys
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
errors = []

def fail(msg):
    errors.append(msg)

# JSON data must parse.
data = {}
for f in sorted((root / 'assets/data').glob('*.json')):
    try:
        data[f.name] = json.loads(f.read_text(encoding='utf-8'))
    except Exception as exc:
        fail(f'JSON {f.relative_to(root)}: {exc}')

# Static HTML semantics, controls, and local references.
titles = {}
for f in sorted(root.glob('*.html')):
    soup = BeautifulSoup(f.read_text(encoding='utf-8'), 'html.parser')
    title = soup.title.get_text(strip=True) if soup.title else ''
    if not title: fail(f'{f.name}: missing title')
    if title in titles: fail(f'{f.name}: duplicate title with {titles[title]}')
    titles[title] = f.name
    desc = soup.find('meta', attrs={'name': 'description'})
    if not desc or not desc.get('content', '').strip(): fail(f'{f.name}: missing meta description')
    if len(soup.find_all('h1')) != 1: fail(f'{f.name}: expected exactly one h1')
    ids = [el['id'] for el in soup.find_all(id=True)]
    if len(ids) != len(set(ids)): fail(f'{f.name}: duplicate id')
    for img in soup.find_all('img'):
        if img.get('alt') is None: fail(f'{f.name}: image missing alt')
    for iframe in soup.find_all('iframe'):
        if not iframe.get('title'): fail(f'{f.name}: iframe missing title')
    for control in soup.find_all(['input', 'select', 'textarea']):
        if control.get('type') in ('hidden', 'submit', 'button', 'reset'): continue
        ident = control.get('id')
        wrapped = control.find_parent('label') is not None
        explicit = bool(ident and soup.find('label', attrs={'for': ident}))
        aria = bool(control.get('aria-label') or control.get('aria-labelledby'))
        if not (wrapped or explicit or aria): fail(f'{f.name}: unlabeled {control.name} {control.get("name") or ident}')
    for tag in soup.find_all(['a', 'img', 'script', 'link']):
        attr = 'href' if tag.name in ('a', 'link') else 'src'
        ref = tag.get(attr)
        if not ref or ref.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:', 'javascript:')): continue
        rel = ref.split('?', 1)[0].split('#', 1)[0]
        if rel and not (root / rel).exists(): fail(f'{f.name}: missing local reference {ref}')

# Browser JS syntax.
if shutil.which('node'):
    for f in sorted((root / 'assets/js').glob('*.js')):
        proc = subprocess.run(['node', '--check', str(f)], capture_output=True, text=True)
        if proc.returncode: fail(f'{f.relative_to(root)}: {proc.stderr.strip()}')

# CSS parse if available.
css_path = root / 'assets/css/styles.css'
css = css_path.read_text(encoding='utf-8')
try:
    import tinycss2
    parsed = tinycss2.parse_stylesheet(css, skip_comments=False, skip_whitespace=False)
    for item in parsed:
        if getattr(item, 'type', None) == 'error': fail(f'CSS parse error: {item.message} at {item.source_line}:{item.source_column}')
except ImportError:
    pass

# Requested invariant: every hero uses the homepage palette, with no page-specific palette selectors.
expected = {
    '--hero-a': '#edf8ff', '--hero-b': '#ecfbf7', '--hero-c': '#f8fbff',
    '--hero-accent': '#2b6fbd', '--hero-accent-2': '#18b8b6'
}
for prop, val in expected.items():
    if f'{prop}:{val}' not in css.replace(' ', '').lower(): fail(f'hero palette value missing: {prop} {val}')
for selector in re.findall(r'body\[data-page=[^\]]+\][^{]*\{[^}]*--hero-', css, re.I):
    fail('page-specific hero palette override found')

# Restored project design tokens and research rail.
for marker in ['#2B5F9E', '#245DD5', '#FDEBEC', '#B4232D', '#F3B8BD', '#f2f4f7', '#475569', '#d4dae2', '.signal-rail:before']:
    if marker.lower() not in css.lower(): fail('restored project style marker missing: ' + marker)

# Project data/media invariants.
projects = data.get('projects.json', {})
gpo = projects.get('groups', {}).get('gpo', {}).get('records', [])
sdp = projects.get('groups', {}).get('sdp', {}).get('records', [])
if len(gpo) != 3: fail('expected 3 GPO records')
if len(sdp) != 2: fail('expected 2 SDP records')
for p in gpo + sdp:
    m = p.get('media', {})
    for key in ('src', 'preview'):
        path = m.get(key)
        if not path or not (root / path).exists(): fail(f'{p.get("id")}: missing media {key}')
    for k in ('width', 'height', 'previewWidth', 'previewHeight'):
        if not isinstance(m.get(k), int) or m[k] <= 0: fail(f'{p.get("id")}: missing media dimension {k}')
# Airspace public scope must stay cautious.
air = next((p for p in gpo if p.get('id') == 'ai-airspace-security'), {})
if air.get('technologies'): fail('Airspace Security technical focus must remain unexposed pending verification')
if 'pending final verification' not in air.get('description', '').lower(): fail('Airspace Security verification wording missing')

# Public renderers and fallbacks.
projects_js = (root / 'assets/js/projects.js').read_text(encoding='utf-8')
for marker in ['safeProjectUrl', 'status-${statusClass', 'project-demo-label', 'Project resources', 'm.previewWidth']:
    if marker not in projects_js: fail('project renderer marker missing: ' + marker)
content_js = (root / 'assets/js/content.js').read_text(encoding='utf-8')
for marker in ['contentSafeUrl', 'contentSafeEmail', 'publicationBlockedStatus', 'researchInterests', 'orcid', 'recommendation', 'manufacturer', 'quantity', 'supportedProjects', 'lastVerified']:
    if marker not in content_js: fail('People/Equipment schema marker missing: ' + marker)
if '/draft|example|verify|pending|owner/i' in content_js: fail('People/Equipment verification classifier is over-broad')

# Forms/Contact/Application restoration.
apply_html = (root / 'apply.html').read_text(encoding='utf-8')
contact_html = (root / 'contact.html').read_text(encoding='utf-8')
admissions_html = (root / 'admissions.html').read_text(encoding='utf-8')
for marker in ['data-application-card', 'data-signal-form="application"', 'name="consent"', 'not an offer of admission, funding, employment, supervision, or project placement']:
    if marker not in apply_html: fail('Apply restoration marker missing: ' + marker)
for marker in ['data-contact-card', 'data-signal-form="contact"', 'data-map-embed', 'data-phone-link', 'name="consent"', 'broader college location']:
    if marker not in contact_html: fail('Contact restoration marker missing: ' + marker)
if 'data-apply-link' not in admissions_html: fail('Admissions configurable application link missing')
forms_js = (root / 'assets/js/forms.js').read_text(encoding='utf-8')
for marker in ['applyMode', 'form-fallback', 'appsScriptEndpoint', 'Email enquiries']:
    if marker not in forms_js: fail('Forms behavior marker missing: ' + marker)

# Config/main runtime restoration.
config = data.get('config.json', {})
expected_config = {
    'email': 'aaalorf@qu.edu.sa', 'phone': '+966163022742',
    'location': 'College of Engineering, Qassim University', 'applyMode': 'external'
}
for k, v in expected_config.items():
    if config.get(k) != v: fail(f'config {k} mismatch')
if config.get('canonicalBaseUrl') != '': fail('canonicalBaseUrl must remain blank until production URL is known')
main_js = (root / 'assets/js/main.js').read_text(encoding='utf-8')
for marker in ['data-map-embed', 'data-apply-link', 'canonicalBaseUrl', 'og:url', 'twitter:image', 'initGoatCounter']:
    if marker not in main_js: fail('main runtime marker missing: ' + marker)
home_js = (root / 'assets/js/home.js').read_text(encoding='utf-8')
if 'home-metric-date' not in home_js or 'Data snapshot checked through' not in home_js: fail('homepage dataset audit dating missing')

# Publications.
pubs = data.get('publications.json', {})
if len(pubs.get('records', [])) != 15: fail('expected 15 publication records')
pub_js = (root / 'assets/js/publications.js').read_text(encoding='utf-8')
for marker in ['safePublicationUrl', '<strong>${m}</strong>']:
    if marker not in pub_js: fail('publication renderer marker missing: ' + marker)
ijcb = next((r for r in pubs.get('records', []) if r.get('title', '').startswith('In defense of low-level structural features')), None)
if not ijcb or ijcb.get('doi') != '10.1109/BTAS.2017.8272747': fail('2017 IJCB DOI missing')

# Apps Script backend markers.
backend = (root / 'backend/google-apps-script/Code.gs').read_text(encoding='utf-8')
for marker in ['FORM_SCHEMAS', "sheet:'Applications'", "sheet:'Contact'", 'appendRow', 'Consent is required', 'SIGNAL_SPREADSHEET_ID', 'SpreadsheetApp.openById', 'LockService']:
    if marker not in backend: fail('Apps Script marker missing: ' + marker)

# Letter templates retain professional fields/privacy language.
rec = (root / 'templates/recommendation-letter.tex').read_text(encoding='utf-8')
off = (root / 'templates/official-letter.tex').read_text(encoding='utf-8')
for marker in ['\\ReferenceID', '\\ApplicantName', '\\RecipientName', '\\RecommenderName', '\\ValidationURL', '\\qrcode', 'confidential recommendation prose', 'Page \\thepage']:
    if marker not in rec: fail('recommendation template marker missing: ' + marker)
for marker in ['\\ReferenceNumber', '\\RecipientName', '\\SubjectLine', '\\SignatoryName', '\\LabWebsite', 'Page \\thepage']:
    if marker not in off: fail('official-letter template marker missing: ' + marker)

# Public staging language must not leak into HTML/JS. Maintainer-only JSON/docs are allowed.
for f in list(root.glob('*.html')) + list((root / 'assets/js').glob('*.js')):
    text = f.read_text(encoding='utf-8').lower()
    for phrase in ['owner input required', 'remove before production', 'your-domain']:
        if phrase in text: fail(f'{f.relative_to(root)} exposes maintainer phrase: {phrase}')

# File manifest exactness.
manifest_path = root / 'docs/FILE_MANIFEST.txt'
if manifest_path.exists():
    actual = sorted(str(p.relative_to(root)).replace('\\', '/') for p in root.rglob('*') if p.is_file())
    listed = sorted(x.strip() for x in manifest_path.read_text(encoding='utf-8').splitlines() if x.strip() and not x.startswith('#'))
    if actual != listed: fail('docs/FILE_MANIFEST.txt does not exactly match repository files')

if errors:
    print('\n'.join('ERROR: ' + e for e in errors))
    sys.exit(1)
print('QA static checks passed')
