chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("request received");
        if (request.method == "getText" && !sender.tab) {
            var text = window.getSelection().toString();
            console.log("text is " + text);
            sendResponse({text: text});
        }
    });
