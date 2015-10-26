var menuItem = {
	"id": "rot13",
	"title": "Rot13-ify This",
	"contexts":["selection"]
}

chrome.contextMenus.create(menuItem);

function clickHandler(info, tab){
	if(info.menuItemId == "rot13" && info.selectionText) {
		alert("this is a test");
		alert("it says: " + convertText(info.selectionText));
	}
}

chrome.contextMenus.onClicked.addListener(clickHandler);

function convertText(pre){
	var post = "";

	//ASCII codes:
	// letter 'A' is ASCII code '65'
	// letter 'Z' is ASCII code '90'
	// letter 'a' is ASCII code '97'
	// letter 'z' is ASCII code '122'

	const DIFF = 13;

	var currentChar, currentCode;

	for(var i=0; i<pre.length; i++){
		
		currentChar = pre[i];
		currentCode = currentChar.charCodeAt(0);

		if((65 <= currentCode && currentCode <= 90)){
			//upper case letter

			var overage = DIFF - (90 - currentCode);
			if(overage > 0){
				convertedCode = 65 + overage - 1;
			} else {
				convertedCode = currentCode + DIFF;
			}

			convertedChar = String.fromCharCode(convertedCode);
			post += convertedChar;

		} else if (97 <= currentCode && currentCode <= 122) {
			//lower case letter
			
			var overage = DIFF - (122 - currentCode);
			if(overage > 0){
				convertedCode = 97 + overage - 1;
			} else {
				convertedCode = currentCode + DIFF;
			}

			convertedChar = String.fromCharCode(convertedCode);
			post += convertedChar;
		} else {
			//doesn't need to be converted for Rot13
			post += currentChar;
		}
	}

	return post;
}