# SIGNAL Lab website

Static GitHub Pages website. Run locally with `python -m http.server 8000`.

## Projects
`projects.html` is the overview. Detailed pages are `gpo-projects.html` and `sdps.html`. Project data is stored in `assets/data/projects.json`; project media is in `assets/images/projects/`.

## Configuration
Edit `assets/data/config.json`. Never commit credentials, confidential student data, or private recommendation text.

## GitHub Pages
Upload all files, keep `.nojekyll`, enable Pages from the repository branch/root, and replace `YOUR-DOMAIN` placeholders after the final URL is known.

## QA
Run `python docs/qa.py`.
