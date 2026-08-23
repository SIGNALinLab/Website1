# SIGNAL Lab website

Static, GitHub Pages-ready website for **SIGNAL Lab — Signal Intelligence for Global Automation and Learning Laboratory**, Department of Electrical Engineering, College of Engineering, Qassim University.

## Run locally

From the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Site configuration

Edit `assets/data/config.json` for the institutional email/phone/location, application mode, optional Apps Script endpoint, final canonical base URL, and optional GoatCounter settings.

The production package currently uses:

- `applyMode: "external"` with the configured Google Form;
- blank `appsScriptEndpoint` (native forms therefore fall back cleanly to email/external application mode);
- blank `canonicalBaseUrl` until the final GitHub Pages/custom-domain URL is known;
- analytics and visible visitor counting disabled by default.

## Content data

- Publications: `assets/data/publications.json`
- Projects: `assets/data/projects.json`
- People: `assets/data/people.json`
- Equipment: `assets/data/equipment.json`
- Recommendation verification: `assets/data/recommendations.json`

Do not invent missing roster, equipment, recommendation, grant, sponsor, or project details. The People and Equipment datasets intentionally remain fail-closed while their records are pending verification.

## Project media

Detailed project pages retain the original demo media. Home/Projects overview cards use lightweight still previews from `assets/images/projects/previews/` to reduce high-traffic page weight. Preview and detailed media use intrinsic dimensions to avoid layout shift.

## Banner system

All page banners use the **same blue–cyan luminous palette as the homepage**. Page-specific scientific motifs, layout, and restrained ambient motion remain distinct. Reduced-motion users receive static hero artwork.

## Applications and contact forms

`assets/js/forms.js` supports both the configured external application form and optional native forms. Native submissions require `appsScriptEndpoint` to point to the Sheet-bound Apps Script in `backend/google-apps-script/Code.gs`.

For native mode:

1. Create/open the destination Google Sheet.
2. Open **Extensions → Apps Script** from that Sheet.
3. Paste `backend/google-apps-script/Code.gs`.
4. Run `initializeSignalSheets()` once.
5. Deploy as a Web app with institutionally appropriate permissions.
6. Put the `/exec` URL in `appsScriptEndpoint`.
7. If using native applications, set `applyMode` to `native`.
8. Confirm test rows appear in both `Applications` and `Contact` as appropriate.

The backend whitelists the two form types, validates required fields/consent/email, neutralizes spreadsheet-formula prefixes, and serializes writes. A public endpoint can receive spam; use institutionally approved abuse protection before enabling it broadly.

## Optional GoatCounter

Leave `goatCounterCode` blank and both `analyticsEnabled` / `visitorCounterEnabled` false for no GoatCounter network requests. If enabling the visible counter, also enable GoatCounter's public visitor-count setting. The counter remains hidden if the count service fails.

## Final domain / SEO

Once the production URL is known:

1. set `canonicalBaseUrl` in `assets/data/config.json`;
2. replace the empty sitemap template with absolute page URLs;
3. update any deployment-specific `robots.txt` sitemap line if desired;
4. replace `YOUR-DOMAIN` in both LaTeX templates.

Runtime JavaScript creates canonical/`og:url` metadata and absolute social-image URLs when `canonicalBaseUrl` is configured. Verify deployed metadata after setting the production URL.

## Recommendation verification and documents

`verify.html` displays only the safe public fields present in `assets/data/recommendations.json`; it does not expose confidential recommendation prose. Alumni recommendation controls remain hidden unless a safe document URL is supplied.

Professional LaTeX templates are in:

- `templates/recommendation-letter.tex`
- `templates/official-letter.tex`

Compile each twice with PDFLaTeX to resolve `Page X of Y` references, e.g.:

```bash
cd templates
pdflatex recommendation-letter.tex
pdflatex recommendation-letter.tex
```

Keep confidential letter prose outside a public repository unless publication is explicitly intended.

## QA

Run:

```bash
python docs/qa.py
```

Also follow `docs/DEPLOYMENT_CHECKLIST.md` before public launch.
