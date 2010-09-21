Titanium.API.info('answer.js is running');

var webview = Ti.UI.createWebView({height:'auto',width:'auto'});

// open template file
var aTemplate = Titanium.Filesystem.getFile('answer.tpl');

if (aTemplate.exists()) {
  Titanium.API.info('Found answer template');
  
  // Read in the html template
  var aBlob = aTemplate.read();
  var aHTML = aBlob.text;
  
  // Add variables from itemData to the template
  aHTML = aHTML.replace('{correctAnswer}', Titanium.UI.currentWindow.correctAnswer);
  
  // Create the web view
  var webview = Ti.UI.createWebView({height:'auto',width:'auto'});
  webview.html = aHTML;
  Titanium.UI.currentWindow.add(webview);
  
} else {
  alert("Error. Could not open the answer template file.");
}
 