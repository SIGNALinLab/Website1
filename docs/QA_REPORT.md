# QA report

Run date: **2026-08-22**

## Production design checks

- Light editorial header and light footer are used consistently across all public pages.
- Every page uses the shared luminous banner system with a page-specific semantic motif.
- Banner motion is ambient and disabled when `prefers-reduced-motion: reduce` is active.
- Homepage now includes the five required application-oriented research-domain cards without inventing new research claims.
- Homepage portfolio metrics are generated from the shipped project/publication datasets rather than duplicated manually.
- Homepage recent-publication cards are generated from `assets/data/publications.json`.
- Homepage/Projects landing cards use lightweight still previews derived from the original project media; detailed project pages retain the full animated demos.
- Homepage metric dating is tied to the project/publication dataset dates rather than the general configuration-review date.
- Projects overview retains the SIGNAL research rail.
- Project-highlight media and detailed project demo media remain unboxed and preserve their natural aspect ratios.
- Homepage project-preview media uses the same light/unboxed treatment rather than the legacy dark/blurred frame.
- GPO and SDP project-type chips remain visually distinct; GPO uses the medium navy-blue family and SDP uses the brighter blue family.
- Project metadata cards use one neutral family with icon-based differentiation.
- Detailed project Demo chips use an explicit play icon rather than a generic icon fallback.
- Admissions contains the participation materials, funding caveat, and expected research practices specified in the preserved site brief.
- People and Equipment pages do not present unverified records as confirmed lab facts.
- The recommendation-verification development demo record is disabled in the production dataset.
- Application mode is explicitly configured; production currently uses the external-form mode, while native mode remains available when an Apps Script endpoint is configured.
- The Contact form includes privacy/consent language when native submission is enabled; without an endpoint it is replaced by a direct email fallback.
- The Contact page includes a map to the broader College of Engineering/Qassim University location without asserting an unverified room.
- Disabled visitor counters are not rendered as public placeholders.
- `robots.txt` and `sitemap.xml` do not publish a fictitious canonical domain before deployment.
- When `canonicalBaseUrl` is configured, the site generates per-page canonical and Open Graph URLs and converts the Open Graph image to an absolute URL.

## Accuracy checks

- Three GPO and two SDP records remain present; no projects were added or removed.
- Project titles, funder/support fields, amounts, durations, team names, and SDP award text were rechecked against the supplied legacy GPO/SDP HTML.
- The AI-Driven Airspace Security source contains a duplicated JPDAF description; the production renderer does not present that duplicate as verified project scope.
- Publication records remain associated with Abdulaziz Alorf and retain DOI/publisher links where supplied.
- Public publication copy does not claim full Scholar-profile reconciliation beyond the evidence in the repository.
- Institutional affiliation and official email remain consistent with the configured Qassim University information and sampled publisher records.
- Citation counts remain intentionally omitted.
- Homepage metrics currently resolve from the data files to 15 publication records, 5 total projects, 3 GPO projects, and 2 Senior Design Projects.

## Validation

- JSON validation: PASS.
- JavaScript syntax: PASS.
- Static local-link/media checks: PASS.
- Duplicate-ID and basic form-label checks: PASS.
- Local HTTP smoke tests: PASS (19/19 public pages and core assets).
- Public staging-language scan: PASS for rendered/public copy; owner-review notes remain only in maintainable data/docs where appropriate.
- Reduced-motion CSS fallback: PASS.
- CSS source sanity checks: PASS.
- Form fallback unit checks: PASS.
- Home-content completeness checks: PASS.
- Admissions-guidance completeness checks: PASS.

Direct localhost navigation with headless Chromium is unreliable/restricted in this sandbox. The current pass therefore does not claim a new Chromium localhost render. Visual-system CSS and previously rendered layouts were left unchanged except for additive homepage/admissions content blocks using the existing card/grid system.

## Final native-form backend/security vet — 2026-08-22
- Corrected the Apps Script backend so successful native submissions are actually appended to the fixed `Applications` or `Contact` sheet instead of returning success without persistence.
- Added one-time `initializeSignalSheets()` setup, fixed headers, field whitelisting, required-field/consent/email validation, formula-prefix escaping, and a script lock for concurrent writes.
- Hardened JSON-driven People, Equipment, and Recommendation rendering with HTML escaping for future records.
- Hardened data-driven external links in Projects and Publications/Home publication cards to permit HTTP(S) URLs only.

## Release-candidate hardening — 2026-08-22
- Native Apps Script form handling was verified to persist only to the whitelisted `Applications` and `Contact` tabs; initialization stores the spreadsheet ID in Script Properties so Web-app requests can reopen the target sheet reliably.
- JSON-driven public renderers escape text fields and restrict external resources to HTTP(S) URLs.
- Config-driven footer strings are escaped before insertion into HTML.
- Project preview media no longer contains a dormant dark/blurred framing path; preview imagery is unboxed at the component level.
- Static Twitter title/description metadata is present on all pages; when `canonicalBaseUrl` is configured, runtime canonical, `og:url`, absolute `og:image`, and `twitter:image` are also generated.
- The custom `404.html` is explicitly `noindex,follow`.
- The 2017 IJCB publication DOI was recovered and added to the publication dataset.
- Project demo and preview images now carry intrinsic width/height metadata so lazy loading does not collapse mobile layout before media enters the viewport.

## Optional analytics / visitor-counter vet — 2026-08-22
- GoatCounter integration is now functional rather than a placeholder: analytics loads the official `count.js` only when explicitly enabled and a valid site code is configured.
- The visible visitor counter uses the documented per-path JSON counter endpoint, remains hidden until a valid count is returned, and fails silently if the counter service is unavailable or public counts are disabled.
- With the shipped production configuration (`analyticsEnabled: false`, `visitorCounterEnabled: false`, blank `goatCounterCode`), no GoatCounter network request is initiated and no visitor-count placeholder is rendered.
- Deployment documentation now records the GoatCounter setting required to permit public visitor counts.


## People / Equipment schema-completeness vet — 2026-08-22
- The public fallback states remain unchanged while the People and Equipment datasets are unverified/empty.
- The People renderer now supports the complete optional profile structure requested by the site brief: leadership/faculty/student/collaborator/alumni grouping, portrait, role, bio, research interests, email, Scholar, ORCID, personal-page links, and an alumni recommendation-document control that is hidden unless a safe URL is supplied.
- The Equipment renderer now supports category grouping plus manufacturer/model, quantity, specifications, status, location, availability/access policy, responsible contact, supported projects, and last-verification date.
- Equipment records carrying draft/example/pending/verification/owner-review status remain fail-closed and are not published as confirmed inventory.
- Future People/Equipment text fields are HTML-escaped; profile/document links are restricted to HTTP(S), and email links require a syntactically valid address.


## Verification-status gate regression vet — 2026-08-22
- Corrected the People/Equipment publication-status classifier so confirmed states such as `Verified` and `Verification complete` are publishable.
- Provisional states such as `Pending verification`, `Verification required`, `Draft`, `Unverified`, owner-review/input states, and `Verify before ...` remain fail-closed.
- The current public People/Equipment appearance is unchanged because both shipped datasets still declare `Pending verification`.
- People fallback wording now refers to the broader research-community roster rather than only staff, matching the supported leadership/faculty/student/collaborator/alumni schema.

## Final release-candidate vet — 2026-08-22
- Re-ran the 64-file manifest, repository QA, JSON validation, browser-side JavaScript syntax, CSS parsing, native Apps Script persistence/security mock, and 19/19 local HTTP smoke checks.
- A deterministic Chromium in-memory harness exercised all 12 public pages at 1440 px and 390 px: the final light header/footer and page-specific hero system win the cascade, active navigation is correct, current Apply/Contact fallbacks resolve correctly, disabled visitor counting remains absent, and no horizontal overflow was detected.
- Current Qassim University pages continue to support the College of Engineering / Electrical Engineering Department affiliation used by the site; representative 2025–2026 publication DOI metadata was also spot-checked against publisher/bibliographic records.
- Fixed the verification-status classifier so `Verified` / `Verification complete` are publishable while genuinely provisional states remain fail-closed.

## Document-template completeness vet — 2026-08-22
- Upgraded the recommendation template from a skeletal placeholder to a professional editable letter containing the expanded SIGNAL Lab identity, slogan, affiliation, date/reference/applicant/context/recipient/recommender variables, signature block, page numbering, QR validation URL, and explicit privacy language clarifying that QR validation covers the public record rather than confidential recommendation prose.
- Upgraded the official-letter template with the expanded identity/slogan/affiliation, date/reference/recipient/title/organization/subject/signatory variables, signature/contact block, lab website, institutional footer, and page numbering.
- Both templates remain free of confidential recommendation content and retain `YOUR-DOMAIN` only as an explicit pre-deployment variable that the owner must replace.
- Both LaTeX templates compile successfully with PDFLaTeX.

