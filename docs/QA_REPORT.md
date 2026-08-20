# QA / acceptance report

Run date: **2026-08-19**

## Passed in this build environment

- `python docs/qa.py`: **PASS** — JSON parse checks, JavaScript syntax (`node --check`), local static links/assets, `.nojekyll`, publication owner-bold logic, secret-marker scan, and public-local alumni recommendation path validation.
- Local HTTP smoke test: **PASS** — HTTP 200 returned for `index.html`, `publications.html`, `projects.html`, `people.html`, `admissions.html`, `apply.html`, `equipment.html`, `contact.html`, `verify.html?id=SIG-REC-DEMO-001`, and `404.html`.
- LaTeX compile test: **PASS** — both `templates/recommendation-letter.tex` and `templates/official-letter.tex` compiled with `pdflatex -halt-on-error` (two passes).
- Publications dataset: **PASS for seeded records** — 15 JSON records, category metadata, author strings, DOI/source links where resolved, visible audit date, no citation counts.
- Forms: **PASS static/fail-safe review** — endpoint is disabled by default; front-end reports configuration fallback; backend restricts writes to `Applications`/`Contact` and sanitizes spreadsheet-formula prefixes.
- Recommendation validation: **PASS static review** — demo validation record contains safe metadata only; valid/revoked/not-found rendering is implemented; public document link appears only when explicitly configured.
- Analytics: **PASS fail-safe review** — GoatCounter is disabled by default and optional loading cannot block the site.

## Environment-limited checks

The installed Chromium executable is blocked by the execution environment administrator from navigating to both `http://127.0.0.1` and `file://` URLs. Therefore automated browser screenshots and live DOM interaction checks for desktop/mobile layouts, keyboard traversal, publication filters/search, and configured form submission could not be executed here. The CSS/JS implementing those behaviors is included and static-checked, but these items should be exercised once in a normal browser before production launch.

Configured Google Apps Script form submission also cannot be end-to-end tested until the owner supplies and deploys an endpoint.

## Factual-content limitations

The Google Sites source could not be extracted through the available retrieval path, so Projects and People are intentionally migration-pending. The supplied Google Scholar profile rate-limited automated access, so the publication dataset is a source-reconciled seed and not claimed complete. See `MIGRATION_CHECKLIST.md`, `PUBLICATION_RECONCILIATION.md`, and `OWNER_VERIFICATION_REQUIRED.md`.
