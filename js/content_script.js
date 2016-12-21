

domTextContent = document.body.textContent;
var messages = alex(domTextContent).messages;
var repeatedWords = [];
var wordsToHighlight = [];

for (var i = messages.length - 1; i >= 0; i--) {
	var textContent = domTextContent.substr( messages[i].location.start.offset, 
		messages[i].location.end.offset - messages[i].location.start.offset).toLowerCase();
	if(repeatedWords.indexOf(textContent) >= 0){ continue; }
	console.log(messages[i]);
	repeatedWords.push(textContent);
	wordsToHighlight.push({
		"text" : textContent,
		"color" : "#ff6",
		"attributes" : {"alex-tooltip" : messages[i].message}
	});
}

// var messages = [
// 	{ "text" : "he", "color" : "#ff6", "attributes" : {"alex-tooltip" : "highlighted!"}},
// 	{ "text" : "amnesty", "color" : "#a0ffff", "attributes" : {"alex-tooltip" : "second!"}},
// ];

var myHilitor = new Hilitor("content");

myHilitor.apply(wordsToHighlight);

$('[alex-tooltip!=""]').qtip({ // Grab all elements with a non-blank data-tooltip attr.
    content: {
        attr: 'alex-tooltip' // Tell qTip2 to look inside this attr for its content
    }
})