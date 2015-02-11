/*
	Dependencies -> 
		1) api.js
		2) auth.js
		3) clipboard.js
*/
(function()
{
	function pushText(text)
	{
		console.log("start pushing " + text);
		API.push(text, 
			function(pasteUrl){
				Clipboard.copyToClipboard(pasteUrl);
			},
			function(){
				console.log("Failed to push text");
			});
	}
		
	// see https://developer.chrome.com/extensions/contextMenus#method-create
	chrome.contextMenus.create({
		title : "Push selected text to Pastebin",
		contexts : ["selection"],
		onclick : function(info, tab){
			if(!Auth.getUserKey())
			{
				alert("not authenticated");
				API.authenticate();
			}
			var text = info['selectionText'];
			if(text)
			{
				pushText(text);
			}
		}
	});

	$(document).ready(function(){
		chrome.contextMenus.create({
		title : "Push text from clipboard to Pastebin",
		contexts : ["all"],
		onclick : function(info, tab){
			if(!Auth.getUserKey())
			{
				alert("not authenticated");
				API.authenticate();
			}
			var text = Clipboard.getClipboardText();
			pushText(text);
		}
	});
	});
})();
