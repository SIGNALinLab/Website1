# Google Apps Script backend

1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste `Code.gs`.
4. Run `initializeSheets()` once.
5. Deploy as a web app with institutionally acceptable permissions.
6. Put the deployment URL in `assets/data/config.json` as `appsScriptEndpoint`.
7. Test both forms.

The backend writes only to `Applications` and `Contact`, and spreadsheet-formula prefixes are escaped. Add suitable CAPTCHA/rate limiting for production.
