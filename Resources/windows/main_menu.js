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
