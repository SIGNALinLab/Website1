# SIGNAL Lab website

Static GitHub Pages site using semantic HTML, modern CSS, vanilla JavaScript, and JSON data.

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. JSON-driven pages require HTTP; do not test by double-clicking HTML files.

## Projects architecture

The main navigation contains **Projects** as a dropdown with:

- `gpo-projects.html` — Government, Private, and Organizational (GPO) Projects
- `sdps.html` — Senior Design Projects (SDPs)

`projects.html` is the portfolio overview. All five migrated projects live in `assets/data/projects.json`; edit that single file to update titles, descriptions, funding/support, teams, durations, links, technologies, awards, and owner-review notes. Source media is stored under `assets/images/projects/gpo/` and `assets/images/projects/sdps/`.

The current project migration is based on the two HTML exports supplied by the owner. The AI-Driven Airspace Security description is duplicated in the legacy source and is deliberately marked for owner review rather than silently rewritten.

## Other content

- Publications: `assets/data/publications.json`
- People: `assets/data/people.json`
- Equipment: `assets/data/equipment.json`
- Recommendation validation: `assets/data/recommendations.json`
- Global configuration: `assets/data/config.json`

## GitHub Pages

1. Upload all repository files to a GitHub repository.
2. In **Settings → Pages**, deploy from the desired branch/root.
3. Keep `.nojekyll`.
4. Replace `https://YOUR-DOMAIN/` in configuration, `robots.txt`, `sitemap.xml`, and LaTeX templates once the final URL is known.
5. All local page links are relative and work under a GitHub Pages project path.

## Forms / Google Sheets

See `backend/google-apps-script/README.md`. Configure `appsScriptEndpoint` in `assets/data/config.json`. The forms fail gracefully before configuration.

## Analytics

GoatCounter is optional. Set `analyticsEnabled`, `visitorCounterEnabled`, and `goatCounterCode` in `assets/data/config.json`. Analytics failure does not block the site.

## Brand assets

`assets/brand/` contains SVG master, horizontal SVG, symbol, monochrome SVG, PNG sizes 512–4096, large horizontal PNG, WebP, and ICO favicon.

## Before public launch

Review `docs/DEPLOYMENT_CHECKLIST.md`, `docs/PROJECT_MIGRATION_REPORT.md`, `docs/PUBLICATION_RECONCILIATION.md`, and `docs/OWNER_VERIFICATION_REQUIRED.md`, then run:

```bash
python docs/qa.py
```
