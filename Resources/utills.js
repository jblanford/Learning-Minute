
function showMessage(text, type) {
  
  if (!type) {
    type = "normal";
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
      closeMessage();
  }, 5000);
}

function isEmptyObject(obj) {
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
}

function isset () {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // +   improved by: Rafał Kukawski
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true
    
    var a = arguments, l = a.length, i = 0, undef;
    
    if (l === 0) {
        throw new Error('Empty isset'); 
    }
    
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false; 
        }
        i++; 
    }
    return true;
}
