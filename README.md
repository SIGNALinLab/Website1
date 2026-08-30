# SIGNAL Lab website

Static GitHub Pages website. Run locally with `python -m http.server 8000`.

## Projects
`projects.html` is the overview. Detailed pages are `gpo-projects.html` and `sdps.html`. Project data is stored in `assets/data/projects.json`; project media is in `assets/images/projects/`.

## Configuration
Edit `assets/data/config.json`. Never commit credentials, confidential student data, or private recommendation text.

## GitHub Pages
Upload all files, keep `.nojekyll`, enable Pages from the repository branch/root, then add the final deployment URL to `assets/data/config.json`, `sitemap.xml`, and `robots.txt` when it is known. The configured base URL also enables canonical/OG/Twitter image URLs at runtime; for maximum crawler compatibility, verify the deployed page source/metadata after the production URL is set.

## Optional privacy-conscious analytics and visitor counter
`assets/data/config.json` includes optional GoatCounter settings. Leave `goatCounterCode` blank and both `analyticsEnabled` / `visitorCounterEnabled` set to `false` to make no analytics request and show no counter. To enable them, set `goatCounterCode` to the GoatCounter site code, enable only the features you want, and—if using the visible counter—enable **Allow adding visitor counts on your website** in GoatCounter's site settings. The counter fails closed: if the count cannot be loaded, it remains hidden and the rest of the site is unaffected.

## QA
Run `python docs/qa.py`.

### Native form backend verification
If switching `applyMode` to `native` or enabling the native Contact form, use the Sheet-bound Apps Script in `backend/google-apps-script/Code.gs`, run `initializeSignalSheets()` once, deploy the Web app, configure `appsScriptEndpoint`, and confirm real test rows are written to both permitted tabs before public launch. The endpoint whitelists the two form types and sanitizes spreadsheet-formula prefixes.

## People and equipment data
`assets/data/people.json` and `assets/data/equipment.json` intentionally ship with empty records until the lab roster and inventory are verified. The front-end renderers already support the full profile/equipment fields described in `MASTER_PROMPT.md`; add only verified records. Alumni recommendation controls remain hidden unless a safe document URL is provided, and draft/pending equipment entries are not published as confirmed inventory.
## Document templates
Professional LaTeX templates are provided in `templates/recommendation-letter.tex` and `templates/official-letter.tex`. Editable letter variables are grouped near the top of each file. Compile from the `templates/` directory with `pdflatex recommendation-letter.tex` or `pdflatex official-letter.tex` (run twice when you want the final `Page X of Y` reference resolved). Before issuing a recommendation, set the real lab website/validation URL and keep confidential recommendation prose outside a public repository.

