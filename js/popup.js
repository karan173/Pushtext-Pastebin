/*
	Dependencies -
		1) jquery
		2) auth.js
		3) api.js
		4) options.js
*/

$(document).ready(function(){
    function getHyphenatedAppName()
    {
        return "pushtext-pastebin";
    }
    function getExtensionUrl()
    {
        var id = chrome.runtime.id;
        return "https://chrome.google.com/webstore/detail/" + getHyphenatedAppName() +"/" + id;
    }
    function getFBUrl()
    {
        return "https://www.facebook.com/sharer/sharer.php?u=" + getExtensionUrl();
    }
    function getTwitterUrl()
    {

    }
	if(Auth.isAuthenticated())
	{
		$('#current-user').text(Auth.getUserName());
		$('#logout').click(function(){
			Auth.logout();
            window.location.reload();
		});
		$('.logged-in').show();
	}
	else
	{

		$('#login-submit').click(function(){
			var username = $('#user_name').val();
			var password = $('#user_password').val();
			API.authenticate(username, password, function(){
                    window.location.reload();
				},
				function(){
                    $('#login-error').text("Error in logging in").show();
				});
		});
		$('#login-form').show();
	}

	$('#options-submit').click(function(){
        Options.setExpiry($('#expiry').val()).setAccessGuest($('#privacy-guest').val())
            .setAccessUser($('#privacy-user').val());
        $('#saved').show().delay(2500).fadeOut();
	});

	//set default values for options form
	$('#expiry').val(Options.getExpiry());
	$('#privacy-guest').val(Options.getAccessGuest());
	$('#privacy-user').val(Options.getAccessUser());

    //set up hyperlinks
    var appName = "Pushtext Pastebin";
    var appNameCaps = "PushtextPastebin";
    var appNameHyphenated = "pushtext-pastebin";
    var appId = chrome.runtime.id;
    var appUrl =  "https://chrome.google.com/webstore/detail/" + appName +"/" + appId;
    var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + appUrl;
    var twitterUrl = "http://twitter.com/share?url=" +
        appUrl +
        "&text=Check out " +
        appName +
        ". It's an amazing time-saver Chrome Extension for Pastebin.&hashtags=" +
        appNameCaps;
    var githubUrl = "https://github.com/karan173/" + appNameHyphenated;
    var reviewUrl = appUrl + "/reviews";
    $('#review-link').click(function(){
        chrome.tabs.create({url: reviewUrl});
    });
    $('#fb-link').click(function(){
        chrome.tabs.create({url: fbUrl});
    });
    $('#twitter-link').click(function(){
        chrome.tabs.create({url: twitterUrl});
    });
    $('#github-link').click(function(){
        chrome.tabs.create({url: githubUrl});
    });
});
