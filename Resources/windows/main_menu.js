
//
// On android create an option menu
//
if (isAndroid) {
	var menu = Titanium.UI.Android.OptionMenu.createMenu();
	 
	var item1 = Titanium.UI.Android.OptionMenu.createMenuItem({
	    title : 'Item 1',
	    icon : '/images/red.png'
	});
	 
	item1.addEventListener('click', function(){
	    Ti.UI.createAlertDialog({ title : 'You clicked Item 1'}).show();
	});
	 
	var item2 = Titanium.UI.Android.OptionMenu.createMenuItem({
	    title : 'Refresh',
	    icon : '/images/refresh.png'
	});
	item2.addEventListener('click', function(){
	    getChannelData();
	});
	 
	menu.add(item1);
	menu.add(item2);
	 
	Titanium.UI.Android.OptionMenu.setMenu(menu);
} else {
	
	var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    
	var item1 = Titanium.UI.createButton({
		title:'Item 1',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	item1.addEventListener('click', function(){
	    Ti.UI.createAlertDialog({ title : 'You clicked Item 1'}).show();
	});
	
	var item2 = Titanium.UI.createButton({
		title:'Refresh',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	item2.addEventListener('click', function(){
	    getChannelData();
	});
	
	var menu = [flexSpace, item1, flexSpace, item2, flexSpace];
}