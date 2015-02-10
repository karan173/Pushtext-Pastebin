/*
	Dependencies -> 
		1) background.html dummy element 
		2) JQuery
*/
Clipboard = {
	//based on 
	//http://stackoverflow.com/questions/7144702/the-proper-use-of-execcommandpaste-in-a-chrome-extension
	copyToClipboard : function(str) {
		//copy the text to a hidden area on background page, select that element, and hit copy
		var dummy = $('#dummy').val(str).select(); 
		document.execCommand('copy');
		dummy.val('');
	},

	getClipboardText : function() {
		//select the hidden element, paste clipboard text into it, then get it from the element
		var result = '';
		var dummy = $('#dummy');
		dummy.val("hello");
		dummy.select();
		if (document.execCommand('paste')) 
		{
			result = dummy.val();
		}
		dummy.val('');
		return result;
	}
};