# Owner verification required

The website is production-safe with respect to unverified content, but the following owner actions remain before treating every section as complete:

- Complete the People/Staff migration from the authoritative roster.
- Provide and verify the actual Equipment inventory before publishing equipment records; the production data file currently contains no placeholder equipment records.
- Confirm the exact room/building if a more precise physical location than the College of Engineering is desired.
- Finalize the project-specific public scope for **AI-Driven Airspace Security**; internal legacy/draft notes remain in `assets/data/projects.json` for traceability but are not shown publicly.
- Complete the publication reconciliation against the supplied Google Scholar profile if an exhaustive publication list is required.
- After the final GitHub Pages/custom-domain URL is known, set the canonical base URL, populate the sitemap/robots sitemap reference, and set the recommendation-template validation URL.
- Production application mode is currently `external`; switch to `native` only after configuring and testing the Google Apps Script endpoint.
- Configure the Google Apps Script endpoint if native Contact-form submission is to be enabled.
