Titanium.API.info('quote.js is running');
Titanium.API.info('Item ID is ' + Titanium.UI.currentWindow.itemData.id);

// open template file
var qTemplate = Titanium.Filesystem.getFile('quote.tpl');

if (qTemplate.exists()) {
  Titanium.API.info('Found quote template');
  
  // Read in the html template
  var qBlob = qTemplate.read();
  var qHTML = qBlob.text;
  
  // Add variables from itemData to the template
  qHTML = qHTML.replace('{QTEXT}', Titanium.UI.currentWindow.itemData.qtext);
  qHTML = qHTML.replace('{QAUTHOR}', Titanium.UI.currentWindow.itemData.qauthor);
  
  // Create the web view
  var webview = Ti.UI.createWebView({height:'auto',width:'auto'});
  webview.html = qHTML;
  Titanium.UI.currentWindow.add(webview);
  
} else {
  alert("Error. Could not open the quote template file.");
}