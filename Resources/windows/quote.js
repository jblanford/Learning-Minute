Titanium.API.info('quote.js is running');
Titanium.API.info('Item ID is ' + Titanium.UI.currentWindow.itemData.nid);

// open template file
var qTemplate = Titanium.Filesystem.getFile('quote.tpl');

if (qTemplate.exists()) {
  Titanium.API.info('Found quote template');
  
  // Read in the html template
  var qBlob = qTemplate.read();
  var qHTML = qBlob.text;
  
  // Add variables from itemData to the template
  qHTML = qHTML.replace('{QTEXT}', Titanium.UI.currentWindow.itemData.field_qtext[0].value);
  qHTML = qHTML.replace('{QAUTHOR}', Titanium.UI.currentWindow.itemData.field_qauthor[0].value);
  
  // Create the web view
  var webview = Ti.UI.createWebView({height:'auto',width:'auto'});
  webview.html = qHTML;
  Titanium.UI.currentWindow.add(webview);
  
} else {
  alert("Error. Could not open the quote template file.");
}