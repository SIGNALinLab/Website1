# Deployment checklist

- [ ] After the final GitHub Pages/custom-domain URL is known, set `canonicalBaseUrl`, populate `sitemap.xml` with absolute URLs, and add the sitemap URL to `robots.txt`.
- [ ] Review the owner-verification items in `OWNER_VERIFICATION_REQUIRED.md`.
- [ ] Confirm project links and external resources still resolve.
- [ ] Configure the Apps Script endpoint if native forms should submit online.
- [ ] Run `python docs/qa.py`.
- [ ] Test desktop/mobile navigation and forms in the deployed GitHub Pages environment.
- [ ] Keep `.nojekyll` in the repository root.

- [ ] Confirm `applyMode` is `external` for the Google Form workflow or `native` only when the Apps Script endpoint is configured.
- [ ] Confirm the configured external Google Form URL is accessible to the intended applicants before launch.
- [ ] Confirm the external Google Form includes the intended privacy/consent language and submission disclaimer.
- [ ] If enabling native forms, run `initializeSignalSheets()` from the Sheet-bound Apps Script project and confirm test rows are written to both `Applications` and `Contact` before launch.

- [ ] If using GoatCounter, set `goatCounterCode` and explicitly choose `analyticsEnabled` and/or `visitorCounterEnabled`; otherwise leave both disabled.
- [ ] If showing the visitor counter, enable **Allow adding visitor counts on your website** in GoatCounter site settings and verify a count appears on the deployed site.
- [ ] If enabling analytics, verify `https://gc.zgo.at/count.js` is not blocked by any deployed Content-Security-Policy and that pageviews arrive in the intended GoatCounter site.
