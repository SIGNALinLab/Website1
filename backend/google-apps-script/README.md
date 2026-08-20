# Google Apps Script backend

1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste `Code.gs`.
4. Run `initializeSheets()` once.
5. Deploy as a web app using institutionally acceptable permissions.
6. Copy the deployment endpoint into `assets/data/config.json` as `appsScriptEndpoint`.
7. Submit test entries to both forms.

The backend accepts only `application` and `contact`; it never accepts an arbitrary sheet name. Cells beginning with spreadsheet-formula prefixes are escaped. Public endpoints can receive spam; add suitable CAPTCHA/rate limiting or another protected static-form service for production.
