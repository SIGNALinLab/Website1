# SIGNAL Lab website

Static GitHub Pages site using semantic HTML, modern CSS, vanilla JavaScript, and JSON data.

## Banner system
All Home/page banners intentionally use one shared light signal-blue/cyan palette. Page identity is preserved through page-specific vector motifs, not different banner hues. The shared banner variables are in `assets/css/styles.css` (`--hero-a`, `--hero-b`, `--hero-c`, `--hero-accent`, `--hero-accent-2`).

## Run locally
`python -m http.server 8000` and open `http://localhost:8000/`.

## Content
Projects: `assets/data/projects.json`; Publications: `assets/data/publications.json`; People: `assets/data/people.json`; Equipment: `assets/data/equipment.json`; Global configuration: `assets/data/config.json`.

## GitHub Pages
Upload the repository root, keep `.nojekyll`, enable Pages, and set the final `canonicalBaseUrl` after deployment.

## Forms
The external Google Form is the default application mode. Native forms can use `backend/google-apps-script/Code.gs` after configuring `appsScriptEndpoint`.

## Document templates
Compile each LaTeX template twice with `pdflatex` so Page X of Y resolves. Replace `YOUR-DOMAIN` before issuing documents.
