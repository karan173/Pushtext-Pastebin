/*
 Dependencies ->
 1) api.js
 2) auth.js
 3) clipboard.js
 */
(function(){

    //see https://developer.chrome.com/extensions/messaging
    function sendMessage(msg, callback)
    {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, msg, callback);
        });
    }

    function pushText(text) {
        API.push(text,
            function (pasteUrl) {
                Clipboard.copyToClipboard(pasteUrl);
                //chrome.browserAction.setBadgeText({"text": "Done"});
                //chrome.browserAction.setBadgeBackgroundColor({"color": "#00FF00"}); //lime color
                sendMessage({"success": true, "message": pasteUrl, "method" : "paste_done"});
            },
            function (errorMessage) {
                sendMessage({"success": false, "message": errorMessage, "method" : "paste_done"});
            });
    }

    chrome.runtime.onInstalled.addListener(function(){
        // see https://developer.chrome.com/extensions/contextMenus#method-create
        chrome.contextMenus.create({
            title: "Push selected text to Pastebin",
            contexts: ["selection"],
            onclick: function () {
                //we don't use the selectionText parameter in info since its contains selected text w/o formatting
                //instead we pass a message to our content script to send us the selected text
                sendMessage({"method": "getText"}, function (response) {
                    pushText(response.text);
                });
            }
        });

        chrome.contextMenus.create({
            title: "Push text from clipboard to Pastebin",
            contexts: ["all"],
            onclick: function () {
                var text = Clipboard.getClipboardText();
                sendMessage({"method": "startLoading"});
                pushText(text);
            }
        });
    });

})();
