/* 
    Learning Minute Prototype - Copyright (c) 2010 John Blanford
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// global config
function ConfigObj()
{
    this.appName = 'Prototype 2';
	  this.version = '1';
}
 
appConfig = new ConfigObj;

Titanium.API.info('app.js is running');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create main content list tab and window
//
var win1 = Titanium.UI.createWindow({  
    title:'Content List',
    backgroundColor:'#fff',
    url:'windows/main_list.js'
});

var tab1 = Titanium.UI.createTab({  
    icon:'images/monitor.png',
    title:'Channel',
    window:win1
});

// pass reference to config object
win1.appConfig = appConfig;

//
// create about tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'About',
    backgroundColor:'#fff',
    url:'windows/about.js'
});

var tab2 = Titanium.UI.createTab({  
    icon:'images/info.png',
    title:'About',
    window:win2
});

// pass reference to config object
win2.appConfig = appConfig;

//
//  add tabs to tabGroup
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
