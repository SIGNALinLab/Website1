/** SIGNAL Lab static-site form backend (Google Apps Script) */
const ALLOWED = { application: 'Applications', contact: 'Contact' };
const HEADERS = {
  Applications: ['Timestamp','Name','Email','Program','Participation Type','Interests','Skills','Availability','Timeline','Links','Consent'],
  Contact: ['Timestamp','Name','Email','Subject','Message','Consent']
};
function safeCell(value) {
  const s = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function initializeSheets() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(HEADERS).forEach(name => {
    let sh = ss.getSheetByName(name); if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS[name]);
  });
}
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents || '{}');
    const sheetName = ALLOWED[p.formType];
    if (!sheetName) throw new Error('Unsupported form type');
    const ss = SpreadsheetApp.getActive();
    const sh = ss.getSheetByName(sheetName);
    if (!sh) throw new Error('Sheet not initialized');
    const t = new Date();
    if (sheetName === 'Applications') sh.appendRow([t,safeCell(p.name),safeCell(p.email),safeCell(p.program),safeCell(p.participationType),safeCell(p.interests),safeCell(p.skills),safeCell(p.availability),safeCell(p.timeline),safeCell(p.links),safeCell(p.consent)]);
    if (sheetName === 'Contact') sh.appendRow([t,safeCell(p.name),safeCell(p.email),safeCell(p.subject),safeCell(p.message),safeCell(p.consent)]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err.message || err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
