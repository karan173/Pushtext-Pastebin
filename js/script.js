//(function () {
function startLoading() {
    var html = '<div id="pushtext-pastebin">'+
    '<span style="margin-right: 20px;">Your paste is being prepared...</span><div id="pushtext-spinner"></div></div>';
    $("body").append(html);
    $("#pushtext-pastebin").show();
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //console.log("message received");
        if (request.method === "getText" && !sender.tab) {
            startLoading();
            var text = window.getSelection().toString();
            sendResponse({text: text});
        }
        else if (request.method === "startLoading" && !sender.tab) {
            startLoading();
        }
        else if (request.method === "paste_done" && !sender.tab && request.hasOwnProperty("success")) {
            var myDiv = $("#pushtext-pastebin");
            var msg = "";
            if (request["success"]) {
                var url = request.message;
                msg = "Your paste is ready. <a target='_blank' href ='" + url + "'>Click here</a> to open the paste in a new tab";
            }
            else {
                msg = request.message;
            }
            myDiv.html(msg);
            setTimeout(function () {
                myDiv.fadeOut().remove();
            }, 7000);
        }
    });

//})();
