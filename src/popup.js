
//hook up "Clear" button, unobtrusively
document.getElementById("clearButton").addEventListener("click", clearAll);
//hook up "Convert" button, unobtrusively
document.getElementById("convertButton").addEventListener("click", convert);

function convert() {

    //get the text input control
    var myTextElement = document.getElementById("mytext");
    var successMessage = document.getElementById('successMessage');
    var errorMessage = document.getElementById('errorMessage');

    if(!myTextElement)
    {
    	errorMessage.innerHTML = '"mytext" element not found';
    	return;
    }

	//get the text entered in the input control
	var preConversion = myTextElement.value;

	if(!preConversion)
	{
		errorMessage.innerHTML = 'Please enter the text, then click "Convert"';
		return;
	}

	var postConversion = convertText(preConversion);

	//assign the convert value
	myTextElement.value = postConversion;

	successMessage.innerHTML = "Success!";
}

function clearAll(){
	var myTextElement = document.getElementById("mytext");
	myTextElement.value = "";

	var successMessage = document.getElementById("successMessage");
	successMessage.innerHTML = "";

	var errorMessage = document.getElementById("errorMessage");
	errorMessage.innerHTML = "";
}

/**
Helpers
*/

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