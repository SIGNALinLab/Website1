const FORM_SCHEMAS = {
  application: {
    sheet: 'Applications',
    headers: ['Timestamp', 'Name', 'Email', 'Program / Discipline', 'Participation Type', 'Research Interests', 'Technical Skills', 'Consent'],
    fields: ['name', 'email', 'program', 'participationType', 'interests', 'skills', 'consent'],
    required: ['name', 'email', 'program', 'participationType', 'interests', 'skills', 'consent']
  },
  contact: {
    sheet: 'Contact',
    headers: ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Consent'],
    fields: ['name', 'email', 'subject', 'message', 'consent'],
    required: ['name', 'email', 'subject', 'message', 'consent']
  }
};

function safeCell(value) {
  const text = String(value == null ? '' : value).trim();
  // Prevent spreadsheet-formula execution when a value begins with a formula prefix.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function cleanPayload(raw, schema) {
  const out = {};
  schema.fields.forEach(function (field) {
    // Keep public form payloads bounded while preserving normal research enquiries.
    out[field] = safeCell(String(raw[field] == null ? '' : raw[field]).slice(0, 10000));
  });
  schema.required.forEach(function (field) {
    if (!out[field]) throw new Error('Missing required field: ' + field);
  });
  if (out.consent.toLowerCase() !== 'yes') throw new Error('Consent is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) throw new Error('Invalid email address');
  return out;
}

function getOrCreateSheet_(spreadsheet, schema) {
  let sheet = spreadsheet.getSheetByName(schema.sheet);
  if (!sheet) sheet = spreadsheet.insertSheet(schema.sheet);
  const headerRange = sheet.getRange(1, 1, 1, schema.headers.length);
  const current = headerRange.getValues()[0];
  const headerMissing = schema.headers.some(function (value, index) { return current[index] !== value; });
  if (headerMissing) headerRange.setValues([schema.headers]);
  sheet.setFrozenRows(1);
  return sheet;
}

function getSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('SIGNAL_SPREADSHEET_ID');
  if (storedId) return SpreadsheetApp.openById(storedId);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('Spreadsheet is not configured. Run initializeSignalSheets() from the Sheet-bound script first.');
  properties.setProperty('SIGNAL_SPREADSHEET_ID', active.getId());
  return active;
}

function initializeSignalSheets() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('Open this Apps Script project from the target Google Sheet before initialization.');
  PropertiesService.getScriptProperties().setProperty('SIGNAL_SPREADSHEET_ID', active.getId());
  Object.keys(FORM_SCHEMAS).forEach(function (key) {
    getOrCreateSheet_(active, FORM_SCHEMAS[key]);
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('Missing request body');
    const payload = JSON.parse(e.postData.contents);
    const schema = FORM_SCHEMAS[payload.formType];
    if (!schema) throw new Error('Unsupported form type');
    const cleaned = cleanPayload(payload, schema);
    const spreadsheet = getSpreadsheet_();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSheet_(spreadsheet, schema);
      const row = [new Date()].concat(schema.fields.map(function (field) { return cleaned[field]; }));
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
