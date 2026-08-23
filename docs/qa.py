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
  preview=p['media'].get('preview')
  if not preview or not (root/preview).exists():errors.append('Missing lightweight preview for '+p['id'])
  if not all(isinstance(p['media'].get(k),int) and p['media'][k]>0 for k in ['width','height','previewWidth','previewHeight']):errors.append('Missing project media dimensions for '+p['id'])

projects_js=(root/'assets/js/projects.js').read_text()
if "p.media.preview||p.media.src" not in projects_js:errors.append('Landing project cards are not using lightweight previews')
styles=(root/'assets/css/styles.css').read_text()
if 'body[data-page="home"] .project-preview-media::before' not in styles:errors.append('Home project previews still rely on dark/blurred media framing')
home_js=(root/'assets/js/home.js').read_text()
if 'projects.lastMigrated' not in home_js or 'pubs.lastAudited' not in home_js:errors.append('Home metric date is not tied to dataset dates')
main_js=(root/'assets/js/main.js').read_text()
if 'nav-dropdown' in main_js:errors.append('Projects dropdown unexpectedly present')
if "play:'<svg" not in main_js:errors.append('Semantic play icon missing for Demo chips')
for group in d['groups'].values():
 for project in group['records']:
  for link in project.get('links',[]):
   if link.get('type')=='github' and str(link.get('url','')).endswith('.git'):
    errors.append('Browser-facing GitHub resource uses clone URL: '+link['url'])
config=json.loads((root/'assets/data/config.json').read_text())
if 'owner' in str(config.get('room','')).lower():errors.append('Owner-review wording remains in public config room field')
equipment=json.loads((root/'assets/data/equipment.json').read_text())
if any('owner input required' in str(v).lower() for r in equipment.get('records',[]) for v in r.values()):
 errors.append('Placeholder equipment data remains in production records')
people=json.loads((root/'assets/data/people.json').read_text())
if 'owner' in str(people.get('status','')).lower():errors.append('Owner-review wording remains in people data status')
if '<strong>${m}</strong>' not in (root/'assets/js/publications.js').read_text():errors.append('Publication owner bolding missing')


# Native form backend must actually persist to the two whitelisted sheets.
backend=(root/'backend/google-apps-script/Code.gs').read_text()
for marker in ['Applications','Contact','initializeSignalSheets','appendRow','SpreadsheetApp.getActiveSpreadsheet','SpreadsheetApp.openById','SIGNAL_SPREADSHEET_ID','FORM_SCHEMAS']:
 if marker not in backend:errors.append('Apps Script persistence/whitelist marker missing: '+marker)
if "payload.formType" not in backend or "Unsupported form type" not in backend:errors.append('Apps Script form-type validation missing')
if "Consent is required" not in backend:errors.append('Apps Script consent validation missing')
# JSON-driven public renderers must escape future text data and restrict external URL schemes.
if 'contentEsc' not in (root/'assets/js/content.js').read_text():errors.append('People/equipment renderer escaping missing')
if 'verifyEsc' not in (root/'assets/js/verify.js').read_text():errors.append('Recommendation renderer escaping missing')
for file,marker in [('publications.js','safePublicationUrl'),('home.js','homeSafeUrl'),('projects.js','safeProjectUrl')]:
 if marker not in (root/'assets/js'/file).read_text():errors.append('External URL scheme validation missing in '+file)

# Home-page completeness and admissions guidance from the preserved site brief.
home=(root/'index.html').read_text()
if home.count('domain-card')!=5:errors.append('Expected five home research-domain cards')
for marker in ['home-publication-count','home-project-count','home-gpo-count','home-sdp-count','home-publications']:
 if marker not in home:errors.append('Missing home portfolio marker: '+marker)
if not (root/'assets/js/home.js').exists():errors.append('Missing data-driven home portfolio script')
admissions=(root/'admissions.html').read_text()
for phrase in ['Short CV','Unofficial transcript','Expected research practices','Funding is not guaranteed']:
 if phrase not in admissions:errors.append('Admissions guidance missing: '+phrase)

# Final release consistency/security/metadata checks.
pubs=json.loads((root/'assets/data/publications.json').read_text())
ijcb=next((r for r in pubs.get('records',[]) if r.get('title','').startswith('In defense of low-level structural features')),None)
if not ijcb or ijcb.get('doi')!='10.1109/BTAS.2017.8272747':errors.append('Recovered 2017 IJCB DOI missing or incorrect')
if 'escGlobal' not in main_js:errors.append('Config-driven footer escaping missing')
if '--media-image:url' in projects_js:errors.append('Project preview still injects media URL into inline CSS')
if 'filter:blur(14px)' in styles or 'background:#0d1934' in styles:errors.append('Dormant dark/blurred project preview framing remains')
for f in root.glob('*.html'):
 html=f.read_text()
 for marker in ['og:site_name','twitter:title','twitter:description']:
  if marker not in html:errors.append(f'Missing social metadata {marker}: {f.name}')
if 'noindex,follow' not in (root/'404.html').read_text():errors.append('404 page is not explicitly noindex')

# Optional GoatCounter integration must be functional, opt-in, and fail without a fake placeholder.
for marker in ['validGoatCounterCode','initGoatCounter','https://gc.zgo.at/count.js','.goatcounter.com/counter/','data-goatcounter','visitorCounterEnabled&&validGoatCounterCode']:
 if marker not in main_js:errors.append('GoatCounter integration marker missing: '+marker)
if 'Visits: —' in main_js:errors.append('Visitor counter still renders a fake placeholder count')
if 'hidden></div>' not in main_js or 'el.hidden=false' not in main_js:errors.append('Visitor counter does not fail closed until a valid count loads')
if '.counter[hidden]{display:none}' not in styles:errors.append('Visitor counter hidden state is not protected against component display styles')
if config.get('analyticsEnabled') is False and config.get('visitorCounterEnabled') is False and config.get('goatCounterCode'):
 errors.append('GoatCounter code is configured while both analytics and counter are disabled; clear it or enable the intended feature')
if 'Allow adding visitor counts on your website' not in (root/'docs/DEPLOYMENT_CHECKLIST.md').read_text():errors.append('GoatCounter visitor-count deployment permission is undocumented')

# People/Equipment renderers must retain the full optional schemas required by the site brief.
content_js=(root/'assets/js/content.js').read_text()
for marker in ['researchInterests','scholar','orcid','personalPage','recommendation','profile-recommendation','Principal Investigator / Leadership','Current Students','Collaborators','Alumni']:
 if marker not in content_js:errors.append('People profile schema support missing: '+marker)
for marker in ['manufacturer','quantity','specifications','availability','responsibleContact','supportedProjects','lastVerified','equipmentPublishable']:
 if marker not in content_js:errors.append('Equipment schema support missing: '+marker)
if 'contentSafeUrl' not in content_js or 'contentSafeEmail' not in content_js:errors.append('People/Equipment safe contact/link helpers missing')
if 'datasetPending' not in content_js:errors.append('People/Equipment dataset-level fail-closed status gate missing')
if 'publicationBlockedStatus' not in content_js:errors.append('People/Equipment verification-status classifier missing')
if '/draft|example|verify|pending|owner/i' in content_js:errors.append('Verification gate is over-broad and would suppress Verified datasets')


# Letter templates must retain the complete professional/editable structure from the site brief.
rec=(root/'templates/recommendation-letter.tex').read_text()
off=(root/'templates/official-letter.tex').read_text()
for marker in ['\\LetterDate','\\ReferenceID','\\ApplicantName','\\ApplicantRoleContext','\\RecipientName','\\RecipientTitle','\\RecipientOrganization','\\RecommenderName','\\RecommenderTitle','\\RecommenderEmail','\\LabWebsite','\\ValidationURL','\\ExpandedLabName','\\LabSlogan','\\Affiliation','\\RecommendationBody','\\qrcode','Page \\thepage','confidential recommendation prose']:
 if marker not in rec:errors.append('Recommendation template marker missing: '+marker)
for marker in ['\\LetterDate','\\ReferenceNumber','\\RecipientName','\\RecipientTitle','\\RecipientOrganization','\\SubjectLine','\\SignatoryName','\\SignatoryTitle','\\SignatoryEmail','\\LabWebsite','\\ExpandedLabName','\\LabSlogan','\\Affiliation','\\LetterBody','Page \\thepage']:
 if marker not in off:errors.append('Official-letter template marker missing: '+marker)

if errors:print('\n'.join('ERROR: '+e for e in errors));sys.exit(1)
print('QA static checks passed')