function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Auth
  var auth_data = Utilities.base64Encode('<user>:<pass>');
  
  // Start
  var col_start = 1;
  var row_start = 1;
 
  // End
  var col_end = 1;
  var row_end = 200;
  
  var data = sheet.getRange(row_start, col_start, row_end, col_end).getValues();
  
  data.forEach(function(url, i) {
    try {
      Logger.log(url);
      
      var params = {
        'method' : 'GET',
        'headers': {
          'Content-type': 'text/html',
          'Authorization' : 'Basic ' + auth_data,
        },
        'muteHttpExceptions': true
      };
      
      var response = UrlFetchApp.fetch(url, params);
      var code = response.getResponseCode();
      Logger.log(code);
      
      Utilities.sleep(200);
      
      sheet.getRange(i+1, 2).setValue(code);
      
    } catch (e) {
      Logger.log(e);
    }
  });
}
