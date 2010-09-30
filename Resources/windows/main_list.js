Titanium.API.info('main_list.js is running');

var channelData = {};

//Titanium.include('../channel.js');
Titanium.include('main_menu.js');
Titanium.include('../utills.js');

Titanium.API.info('saved data is ' + Titanium.App.Properties.getList('savedData'));
var savedData = Titanium.App.Properties.getList('savedData');
if (savedData[0] != "none") {
  channelData = savedData[0];
}

// Create tableview
var tableview = Titanium.UI.createTableView({backgroundColor:'white'});

// click event handler
tableview.addEventListener('click', function(e) {
    // event data
    var row = e.row;
    
    var newWindow = Ti.UI.createWindow();
    
    // Titanium.UI.createAlertDialog({title:'Table View',message:'Item number ' + row.itemNumber + ', ID ' + channelData.items[row.itemNumber].id}).show();
    
    switch(channelData[row.itemNumber].type) {
      case "item_quote": {
        newWindow.url = 'quote.js';
        break;
      }
      case "item_question": {
        newWindow.url = 'question.js';
        break;
      }
    }
    
    // Set new window title
    newWindow.title = channelData[row.itemNumber].title;
    
    // Add ref to itemData to new window
    newWindow.itemData = channelData[row.itemNumber];
    
    // Open the new window
    Titanium.UI.currentWindow.tab.open(newWindow);
    
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);


// load data: do xhr, set message
//    on success: parse data, update tableView, remove message, save channelData & tableData
//    on error or time out: flash warning message
function getChannelData() {
  if (Titanium.Network.online == true) {
    
    // Create the xhr object
    xhr = Titanium.Network.createHTTPClient();
    
    // Set the timeout on the xhr object
    xhr.setTimeout(10000);
    
    // First setup the event handlers
    xhr.onerror = function(e) {
      closeMessage();
      flashWarning('Unable to load channel');
      
      Titanium.API.error('Unable to load channel');
      Titanium.API.error('xhr said ' + e.error);
    };
    
    xhr.onload = function(e) {
      // Sucessful operation from the send
      if (xhr.readyState == 4) {
        
        rpcResponse = JSON.parse(this.responseText);
        Titanium.API.info(rpcResponse);
        
        if (isset(rpcResponse.error)) {
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


// loop over channel items and create rows
function buildTableRows() {
  
  Titanium.API.info('buildTableRows running');
  
  // clear out the tableview
  tableview.setData([]);
  
  for (var i = 0; i < channelData.length; i++) {
    Titanium.API.info('Item Node ID is ' + channelData[i].nid);
    
    var row = Ti.UI.createTableViewRow({
        hasChild: true,
        title: channelData[i].title,
        selectedColor: "#FFA500",
        itemNumber: i
    });
    
    // Add left icon based on item type
    switch(channelData[i].type) {
      case "item_quote": {
          row.leftImage = "../images/people.png";
          break;
      }
      case "item_question": {
          row.leftImage = "../images/question.png";
          break;
      }
    }
    
    // Add title
    var itemTitle = Ti.UI.createLabel({
        color:'#576996',
        font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
        text:channelData[i].title
    });
    
    row.add(itemTitle);
    
    tableview.appendRow(row);
    
  }
}


if (isEmptyObject(channelData)) {
  
  Titanium.API.info('Channel data is empty');
  
  // load data from network
  getChannelData();
  
} else {
  
  Titanium.API.info('Building tableview from saved channelData');
  //channelData = Titanium.App.channelData;
  
  // build table rows from saved data
  buildTableRows();
  
}


