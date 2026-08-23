# Google Apps Script backend

This optional backend supports the native SIGNAL Lab application and contact forms while the public site remains static on GitHub Pages.

## Setup

1. Create or open the Google Sheet that should receive submissions.
2. From that Sheet, open **Extensions → Apps Script** so the script is bound to the intended spreadsheet.
3. Replace the default script with `Code.gs` from this directory.
4. Run `initializeSignalSheets()` once and authorize it. This creates/initializes only the `Applications` and `Contact` tabs with fixed headers and stores the bound spreadsheet ID in Apps Script Script Properties for reliable Web-app writes.
5. Deploy the script as a Web app using institutionally acceptable access settings.
6. Copy the `/exec` deployment URL into `assets/data/config.json` as `appsScriptEndpoint`.
7. For native applications, set `applyMode` to `native`. Contact submission becomes native whenever `appsScriptEndpoint` is configured.
8. Submit one application and one contact test, then confirm the rows appear in the correct tabs.

## Data handling and security

- The backend accepts only the two explicit form types: `application` and `contact`.
- Each form has a fixed field whitelist and required-field validation.
- Spreadsheet-formula prefixes (`=`, `+`, `-`, `@`) are escaped before storage.
- Consent must be `yes`, and a basic email-format check is applied.
- Writes are serialized with a script lock to reduce concurrent-write collisions.
- No service-account file, API key, password, or other secret belongs in this repository.

A public Web-app endpoint can receive spam or automated traffic. Before enabling native forms for production, consider institutionally approved rate limiting, CAPTCHA/Turnstile or equivalent abuse controls, retention rules, and access restrictions on the destination Sheet.
