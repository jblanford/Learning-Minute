Titanium.API.info('main_list.js is running');

var channelData = {};

// set platform
var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}

// includes
Titanium.include('main_menu.js');
Titanium.include('../utills.js');

// get saved data
Titanium.API.info('saved data is ' + Titanium.App.Properties.getList('savedData'));
var savedData = Titanium.App.Properties.getList('savedData');
if (savedData[0] != "none") {
  channelData = savedData[0];
}


//
// Setup empty tableview
//

var tableview = Titanium.UI.createTableView({backgroundColor:'white'});

// click event handler
tableview.addEventListener('click', function(e) {
    // event data
    var row = e.row;
    
    var newWindow = Ti.UI.createWindow({navBarHidden: 'false',});
    
    switch (channelData[row.itemNumber].type) {
      case "item_quote":
        newWindow.url = 'quote.js';
        newWindow.title = "Service Quote";
        break;
      
      case "item_question":
        newWindow.url = 'question.js';
        newWindow.title = "Test Your Knowledge";
        break;
      
    }
    
    // Add ref to itemData to new window
    newWindow.itemData = channelData[row.itemNumber];
    
    // Open the new window
    Titanium.UI.currentWindow.tab.open(newWindow);
    
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

// addd menu to toolbar on iphone
if (!isAndroid) {
	Titanium.UI.currentWindow.setToolbar(menu);
}

//
// loop over channel items and create rows
//

function buildTableRows() {
  
  Titanium.API.info('buildTableRows running');
  
  // clear out the tableview
  tableview.setData([]);
  
  for (var i = 0; i < channelData.length; i++) {
    Titanium.API.info('Item Node ID is ' + channelData[i].nid);
    
    var row = Ti.UI.createTableViewRow({
        hasChild: true,
        selectedColor: "#FFA500",
        itemNumber: i
    });
    
    // Add left icon based on item type
    switch(channelData[i].type) {
      case "item_quote": 
          row.leftImage = "../images/people.png";
          break;
      
      case "item_question": 
          row.leftImage = "../images/question.png";
          break;
      
    }
    
    // Add title
    var itemTitle = Ti.UI.createLabel({
        color:'#576996',
        font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
        left: 45,
        text:channelData[i].title
    });
    
    row.add(itemTitle);
    
    tableview.appendRow(row);
    
  }
}


//
// Setup the xhr object
//

xhr = Titanium.Network.createHTTPClient();

// Set the timeout on the xhr object
xhr.setTimeout(10000);

// Onerror event handler
xhr.onerror = function(e) {
  closeMessage();
  flashWarning('Unable to load channel');
  
  Titanium.API.error('Unable to load channel');
  Titanium.API.error('xhr said ' + e.error);
};

// Onload event handler
xhr.onload = function(e) {
  
  // Sucessful operation from the send
  if (xhr.readyState == 4) {
    
    // parse the response text into an object
    rpcResponse = JSON.parse(this.responseText);
    Titanium.API.info(rpcResponse);
    
    // check if rpc returned an error
    if (isset(rpcResponse.error)) {
      
      // log error and inform user
      closeMessage();
      flashWarning('Server error on load channel');
      Titanium.API.info("Request returned JSON-rpc error");
      Titanium.API.info(rpcResponse.error);
      
    } else {
      
      channelData = rpcResponse.result;
      
      closeMessage();
      
      buildTableRows();
      
      // store copy of data in app context
      Titanium.App.Properties.setList("savedData", [rpcResponse.result]);
      
    }
  } 
  
  Titanium.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState);
};
    
//
// Do JSON-rpc request to Drupal back end
//

function getChannelData() {
  if (Titanium.Network.online == true) {
    
    showMessage('Loading channel data...');
    
    xhr.open('POST', "http://dev.vaultechnology.com/lm/services/json-rpc");
    
    xhr.send({
        "version": "1.1", 
        "method": "views.get", 
        "id": Math.floor(Math.random()*1001),
        "params": JSON.stringify({"view_name":"channel_data","display_id":"Defaults","args":["1"]})
    });
    
  } else {
    
    flashWarning('Unable to access netowrk');
    
  }
}
//
// main window logic
//

if (isEmptyObject(channelData)) {
  
  Titanium.API.info('Channel data is empty');
  
  // load data from network
  getChannelData();
  
} else {
  
  Titanium.API.info('Building tableview from saved channelData');
  
  // build table rows from saved data
  buildTableRows();
  
}


