/**
 * Candela Technologies — Network X 2026 meeting request handler.
 *
 * SETUP:
 * 1. Create a new Google Sheet (e.g. "Network X 2026 - Meeting Requests").
 * 2. In the sheet: Extensions > Apps Script.
 * 3. Delete any starter code and paste this whole file in.
 * 4. Click Deploy > New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Click Deploy, authorize the permissions Google asks for.
 * 6. Copy the resulting Web App URL and paste it into SCRIPT_URL
 *    near the bottom of index.html.
 *
 * Every submission appends one row to the sheet's first tab, creating
 * a header row automatically the first time it runs.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid payload' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var headers = [
    'Timestamp', 'Name', 'Email', 'Company', 'Title',
    'Phone', 'Preferred Day', 'Topics', 'Message', 'Source'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.title || '',
    data.phone || '',
    data.day || '',
    data.topics || '',
    data.message || '',
    data.source || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you sanity-check the deployment by visiting the
// web app URL directly in a browser (GET request).
function doGet() {
  return ContentService
    .createTextOutput('Candela Network X 2026 form endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
