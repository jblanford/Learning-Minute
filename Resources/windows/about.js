// text label 
var label = Titanium.UI.createLabel({
	color:'#999',
	text:Titanium.UI.currentWindow.appConfig.appName + "\n\n" + Titanium.UI.currentWindow.appConfig.version,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	top: 135,
	width:'auto'
});

// logo image
var logo_file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/logo.png');

var logo = Titanium.UI.createImageView({
	image:logo_file,
	top: 35,
	width:64,
	height:64
});

Titanium.UI.currentWindow.add(logo);

Titanium.UI.currentWindow.add(label);