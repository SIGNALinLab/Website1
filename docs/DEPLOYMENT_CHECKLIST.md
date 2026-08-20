# Deployment checklist

- [ ] Confirm final domain in `assets/data/config.json`, run `python tools/sync_site_metadata.py`, and update the LaTeX template website/validation variables.
- [ ] Import and fact-check Projects from the existing owner source.
- [ ] Import and fact-check People/Staff from the existing owner source.
- [ ] Remove the development recommendation validation record.
- [ ] Confirm which alumni recommendation documents may be public.
- [ ] Verify exact room/building; otherwise retain broader College of Engineering map wording.
- [ ] Confirm official lab email/phone.
- [ ] Replace all equipment draft placeholders with verified inventory or remove them.
- [ ] Complete publication reconciliation against the supplied Scholar profile.
- [ ] Configure/test Apps Script forms and spreadsheet tabs.
- [ ] Add production spam/rate-limit/CAPTCHA controls.
- [ ] Configure GoatCounter only if desired; enable public visitor counts if the footer total is required.
- [ ] Run `python docs/qa.py`.
- [ ] Test desktop, mobile, keyboard navigation, visible focus, and reduced motion.
- [ ] Confirm no secrets, private recommendations, restricted data, or confidential student information are committed.
- [ ] Review all claims for academic accuracy and remove unsupported marketing language.
