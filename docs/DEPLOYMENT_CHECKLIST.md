# SIGNAL Lab deployment checklist

- [ ] Run `python docs/qa.py` and resolve every error.
- [ ] Confirm the site works from a local HTTP server rather than only `file://`.
- [ ] Confirm `.nojekyll` remains at the repository root.
- [ ] Confirm `applyMode` is intentionally `external` or `native`.
- [ ] If using the external application mode, manually open the configured Google Form and confirm sharing/privacy/consent settings.
- [ ] If enabling native forms, run `initializeSignalSheets()` from the Sheet-bound Apps Script project, configure `appsScriptEndpoint`, and verify real test rows in both permitted tabs.
- [ ] If enabling a public Apps Script endpoint, apply institutionally approved spam/rate-limit/CAPTCHA protections where appropriate.
- [ ] Keep People unpublished until the roster is verified.
- [ ] Keep Equipment unpublished until inventory/ownership/status data is verified.
- [ ] Confirm any public recommendation record is intentional and contains no confidential recommendation prose.
- [ ] Set the final `canonicalBaseUrl` once the GitHub Pages/custom-domain URL is known.
- [ ] Populate `sitemap.xml` with absolute production URLs once the final URL is known.
- [ ] Replace `YOUR-DOMAIN` in both LaTeX letter templates before issuing documents.
- [ ] If using GoatCounter, set `goatCounterCode` and explicitly enable only the desired analytics/counter features.
- [ ] If showing the visitor counter, enable GoatCounter's public visitor-count permission and confirm the deployed count loads.
- [ ] Test desktop and mobile navigation, keyboard focus, publication search/filters, Project pages, Apply, Contact, People/Equipment fallbacks, and recommendation verification.
