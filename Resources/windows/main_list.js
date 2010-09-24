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
    
    switch(channelData.items[row.itemNumber].type) {
      case "quote": {
        newWindow.url = 'quote.js';
        break;
      }
      case "question": {
        newWindow.url = 'question.js';
        break;
      }
    }
    
    // Set new window title
    newWindow.title = channelData.items[row.itemNumber].title;
    
    // Add ref to itemData to new window
    newWindow.itemData = channelData.items[row.itemNumber];
    
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
      Titanium.UI.createAlertDialog({title:'Channel Error', message:e.error}).show();
    };
    
    xhr.onload = function(e) {
      // Sucessful operation from the send
      if (xhr.readyState == 4) {
        channelData = JSON.parse(this.responseText);
        Titanium.API.info(channelData);
        buildTableRows();
        closeMessage();
        // store copy of data in app context
        Titanium.App.Properties.setList("savedData", [channelData]);
        //Titanium.App.channelData = channelData;
      } 
      
      Titanium.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState);
    };
    
    showMessage('Loading channel data...');
    
    xhr.open('GET', "http://dev.vaultechnology.com/channel.php");
    
    xhr.send();
  }
}


// loop over channel items and create rows
function buildTableRows() {
  
  Titanium.API.info('buildTableRows running');
  
  // clear out the tableview
  tableview.setData([]);
  
  for (var i = 0; i < channelData.items.length; i++) {
    Titanium.API.info('Item ID is ' + channelData.items[i].id);
    
    var row = Ti.UI.createTableViewRow({
        hasChild: true,
        title: channelData.items[i].title,
        selectedColor: "#FFA500",
        itemNumber: i
    });
    
    // Add left icon based on item type
    switch(channelData.items[i].type) {
      case "quote": {
          row.leftImage = "../images/people.png";
          break;
      }
      case "question": {
          row.leftImage = "../images/question.png";
          break;
      }
    }
    
    // Add title
    var itemTitle = Ti.UI.createLabel({
        color:'#576996',
        font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
        text:channelData.items[i].title
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


