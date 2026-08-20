# SIGNAL Lab — GitHub Pages website

Static, framework-free research-lab website designed for GitHub Pages project-path hosting. It uses semantic HTML5, modern CSS, small vanilla JavaScript modules, and JSON data files.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. Do not test by double-clicking the HTML because JSON fetches require HTTP.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, choose the branch/folder deployment source (or a Pages workflow if preferred).
3. Keep `.nojekyll`.
4. Set `canonicalBaseUrl` in `assets/data/config.json`, then run `python tools/sync_site_metadata.py` to regenerate `robots.txt` and `sitemap.xml`.
5. If using a custom domain, configure it in GitHub Pages and add `CNAME` only after the final domain is known.

All internal links are relative, so the site does not assume deployment at `/` and works under a GitHub Pages project path.

## Central configuration

Edit `assets/data/config.json` for domain, affiliation/contact display, forms endpoint, map, analytics, social links, and application mode. For a domain change, run `python tools/sync_site_metadata.py` after editing so the sitemap and robots file remain synchronized. Never commit credentials, tokens, service-account files, private API keys, confidential student data, or private recommendation text.

## Data files

- Publications: `assets/data/publications.json`
- Projects: `assets/data/projects.json`
- People: `assets/data/people.json`
- Equipment: `assets/data/equipment.json`
- Recommendation validation records: `assets/data/recommendations.json`

### Publications
The current dataset is a source-reconciled seed because Google Scholar automated access was rate-limited during the audit. Use `docs/PUBLICATION_RECONCILIATION.md` before launch. Citation counts are intentionally absent.

### Projects and people
The source Google Sites content could not be extracted automatically in the build session, so no project or person was invented. Import the owner-verified source content into the JSON schemas before launch.

### Alumni recommendations
Keep public PDFs under `assets/recommendations/` only if publication is intentional. For sensitive or signed letters, prefer private/external document storage and expose only safe verification metadata. Public recommendation controls should render only when a valid URL exists.

### Verification records
`verify.html?id=SIG-REC-YYYY-NNN` reads `assets/data/recommendations.json`. Remove the development demonstration record before production. The verification page is intentionally limited to safe metadata.

### Equipment
All included equipment entries are explicit draft placeholders. Replace them with verified inventory and `lastVerified` dates.

## Google Sheets forms
See `backend/google-apps-script/README.md`. The static forms remain usable as pages and fail gracefully with an email fallback until `appsScriptEndpoint` is configured.

## GoatCounter
Set `analyticsEnabled`, `visitorCounterEnabled`, and `goatCounterCode` in `assets/data/config.json`. In GoatCounter, enable the setting that allows visitor counts if the visible total is desired. If analytics is unconfigured or blocked, the site continues normally.

## Brand assets
`assets/brand/` includes SVG master, horizontal SVG, standalone symbol, monochrome SVG, PNG sizes (512–4096), horizontal PNG, WebP, and favicon ICO.

## Letter templates
- `templates/recommendation-letter.tex`
- `templates/official-letter.tex`

Editable variables are grouped near the top of each file.

## Before launch
Run `python docs/qa.py`, review `docs/QA_REPORT.md`, review every item in `docs/DEPLOYMENT_CHECKLIST.md`, and complete `docs/MIGRATION_CHECKLIST.md` and `docs/PUBLICATION_RECONCILIATION.md`.
