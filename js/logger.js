/*
	Dependencies -> none
*/
Logger = {
	log : function(text)
	{
		chrome.extension.getBackgroundPage().console.log(text);
	}	
};