Titanium.API.info('main_list2.js is running');

Titanium.include('../channel.js');
Titanium.API.info('Channel is ' + channelData.name);

Titanium.include('main_menu.js');

Titanium.include('../message_win.js');

showMessage('Loading channel data...');

	
var xhr = Ti.Network.createHTTPClient();

xhr.onerror = function(e) {
  alert(e.rrror)
  
};

xhr.onload = function() {
  var data = JSON.parse(this.responseText);
  Titanium.API.info(data); 
  closeMessage();  
};

xhr.open('GET', "http://dev.vaultechnology.com/channel.php");

xhr.send();
    
    
// Create tableview
var tableview = Titanium.UI.createTableView({backgroundColor:'white'});

// loop over channel items and create rows
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
