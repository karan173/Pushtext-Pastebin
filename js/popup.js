/*
	Dependencies -
		1) jquery
		2) auth.js
		3) api.js
		4) options.js
*/

$(document).ready(function(){

	if(Auth.isAuthenticated())
	{
		$('#current-user').text(Auth.getUserName());
		$('#logout').click(function(){
			Auth.logout();
			window.close();
		});
		$('.logged-in').show();
	}
	else
	{

		$('#login-submit').click(function(){
			var username = $('#user_name').val();
			var password = $('#user_password').val();
            Logger.log(username + " " + password);
			API.authenticate(username, password, function(){
				alert("success in authentication");
				},
				function(){
					alert("error in authenticate");
				});
		});
		$('#login-form').show();
	}

	$('#options-submit').click(function(){
        Options.setExpiry($('#expiry').val()).setAccessGuest($('#privacy-guest').val())
            .setAccessUser($('#privacy-user').val());
	});

	//set default values for options form
	$('#expiry').val(Options.getExpiry());
	$('#privacy-guest').val(Options.getAccessGuest());
	$('#privacy-user').val(Options.getAccessUser());

});
