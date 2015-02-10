/*
	Dependencies -
		1) jquery
		2) auth.js
		3) api.js
*/

$(document).ready(function(){

	if(Auth.isAuthenticated())
	{
		$('#current-user').text(Auth.getUserName());
		$('#logout').click(function(){
			Auth.logout();
		});
		$('#logged-in').show();
	}
	else
	{

		$('#login-submit').click(function(){
			var username = $('#user_name').val();
			var password = $('#user_password').val();
			API.authenticate(username, password, function(){
				alert("success in authentication");
				},
				function(){
					alert("error in authenticate");
				});
		});
		$('#login-form').show();
	}

});
