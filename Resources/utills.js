
function showMessage(text, type) {
  
  if (!type) {
    var type = "normal";
  }
  
  messageWin = Titanium.UI.createWindow({
      height:30,
      width:250,
      bottom:80,
      borderRadius:10,
      touchEnabled:false
  });
  messageView = Titanium.UI.createView({
      height:30,
      width:250,
      borderRadius:10,
      opacity:0.7,
      touchEnabled:false
  });
  
  messageLabel = Titanium.UI.createLabel({
      text:'',
      color:'#fff',
      width:250,
      height:'auto',
      font:{
        fontFamily:'Helvetica Neue',
        fontSize:13
      },
      textAlign:'center'
  });
  
  if (type == "warning") {
    messageView.backgroundColor = '#FF0000';
    messageView.opacity = 1.0;
  } else {
    messageView.backgroundColor = '#000';
  }
  
  messageWin.add(messageView);
  messageWin.add(messageLabel);
  
  messageLabel.text = text;
	messageWin.open();
}

function closeMessage() {
  messageWin.close({opacity:0,duration:500});
}

function flashWarning(text) {
  showMessage(text, 'warning');
  setTimeout(function() {
      closeMessage()
  }, 5000);
}

function isEmptyObject(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
