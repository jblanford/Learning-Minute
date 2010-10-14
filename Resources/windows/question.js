Titanium.API.info('question.js is running');
Titanium.API.info('Item ID is ' + Titanium.UI.currentWindow.itemData.nid);

Titanium.include('../utills.js');

// View to hold all parts of the page
var questionContainer = Ti.UI.createView({
    height:'auto',
    backgroundColor: 'white',
    layout:'vertical'
});

// Add label for question text
var questionText = Titanium.UI.createLabel({
    text: Titanium.UI.currentWindow.itemData.field_question[0].value,
    color:'#000',
    textAlign:'left',
    top: 10
});
questionContainer.add(questionText);

// Create header for tableview
var header = Ti.UI.createView({
	backgroundColor:'#336699',
	height:'auto'
});

var headerLabel = Ti.UI.createLabel({
	font:{fontFamily:'Helvetica Neue',fontSize:10,fontWeight:'bold'},
	text:'Select Your Answer',
	color:'#fff',
	textAlign:'left'
	
});

header.add(headerLabel);

// create table view for answers
var tableview = Titanium.UI.createTableView({
    top: 15,
    headerView: header
});

// Add answer rows to table view
for (var i = 0; i < Titanium.UI.currentWindow.itemData.field_answers.length; i++) {
  if (isset(Titanium.UI.currentWindow.itemData.field_answers[i].value)) {
    var row = Ti.UI.createTableViewRow({
        hasChild: true,
        selectedColor: "#FFA500"
    });
    
    var answerLabel = Titanium.UI.createLabel({
        text:Titanium.UI.currentWindow.itemData.field_answers[i].value,
        color:'#000',
        top: 10,
        left: 0,
        height:'auto',
        textAlign:'left'
    });
    row.add(answerLabel);
    
    tableview.appendRow(row);
  }
}

tableview.addEventListener('click',function(e) {
    
    var ans_win = Ti.UI.createWindow();
    ans_win.correctAnswer = Titanium.UI.currentWindow.itemData.field_correct_answer[0].value;
    ans_win.url = 'answer.js';
    Titanium.UI.currentWindow.tab.open(ans_win);
    
});

questionContainer.add(tableview);

Titanium.UI.currentWindow.add(questionContainer);