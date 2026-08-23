# Google Apps Script backend

Bind `Code.gs` to the target Google Sheet, run `initializeSignalSheets()` once, deploy as a Web app, and place the `/exec` URL in `assets/data/config.json`. The backend accepts only the Application and Contact schemas and escapes spreadsheet-formula prefixes.
