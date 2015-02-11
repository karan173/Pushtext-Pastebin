/*
 Dependencies ->
 1) api.js
 2) auth.js
 3) clipboard.js
 */

    function pushText(text) {
        API.push(text,
            function (pasteUrl) {
                Clipboard.copyToClipboard(pasteUrl);
                chrome.browserAction.setBadgeText({"text": "Done"});
                chrome.browserAction.setBadgeBackgroundColor({"color": "#00FF00"}); //lime color
            },
            function () {
                console.log("Failed to push text");
            });
    }

    chrome.runtime.onInstalled.addListener(function(){
        // see https://developer.chrome.com/extensions/contextMenus#method-create
        chrome.contextMenus.create({
            title: "Push selected text to Pastebin",
            contexts: ["selection"],
            onclick: function () {
                if (!Auth.getUserKey()) {
                    alert("not authenticated");
                    API.authenticate();
                }
                //we don't use the selectionText parameter in info since its contains selected text w/o formatting
                //instead we pass a message to our content script to send us the selected text
                //see https://developer.chrome.com/extensions/messaging

                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {method: "getText"}, function (response) {
                        var text = response.text;
                        pushText(text);
                    });
                });
            }
        });

        chrome.contextMenus.create({
            title: "Push text from clipboard to Pastebin",
            contexts: ["all"],
            onclick: function () {
                if (!Auth.getUserKey()) {
                    alert("not authenticated");
                    API.authenticate();
                }
                var text = Clipboard.getClipboardText();
                pushText(text);
            }
        });
    });
