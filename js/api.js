/*
	Dependencies ->
		1) auth.js
		2) config.js
		3) options.js
		4) api_enums.js
*/
var API = {
	

	push : function(text, successCallback, errorCallback){
        function isGoodResponse(response){
            return response.length > 4 && response.substring(0, 4) === "http";
        }
		var data = {
			api_dev_key: Config.apiDeveloperKey,
	        api_option : "paste",
	        api_paste_code : text,  
	        api_paste_private : ApiEnums.accessEnum[Options.getAccessGuest()],
	        api_paste_expire_date : ApiEnums.expiryEnum[Options.getExpiry()]
		};
		if(Auth.isAuthenticated())
		{
			data.api_user_key = Auth.getUserKey();
			data.api_paste_private = ApiEnums.accessEnum[Options.getAccessUser()];
		}
		$.ajax({
		    url: "http://pastebin.com/api/api_post.php",
		    data: data,
		    type: "POST",
		    dataType : "text", 
		    success: function( response ) {
		    	if(isGoodResponse(response))
		    	{
		    		successCallback(response);
		    	}
		    	else
		    	{
		    		errorCallback(response);
		    	}
		    },
		    error: function( xhr, status, errorThrown ) {
		        errorCallback("Some error occurred. Please contact the developer if the error persists.");
		    }
		});
	},

	authenticate : function(username, password, successCallback, errorCallback){
        var data = {
                api_dev_key: Config.apiDeveloperKey,
                api_user_name : username,
                api_user_password : password
            };
        function isGoodResponse(response){
            return response.length >= 3 && response.substring(0, 3) !== "Bad";
        }
		$.ajax({
		    url: "http://pastebin.com/api/api_login.php",
		    data: data,
		    type: "POST",
		    dataType : "text",

		    success: function( response ) {
                if(isGoodResponse(response))
		    	{
		    		Auth.storeUserCredentials(response, username);
		    		successCallback();
		    	}
		    	else
		    	{
		    		errorCallback();
		    	}
		    },
		    error: function( xhr, status, errorThrown ) {
                Logger.log("error");
                errorCallback();
		    }
		});
	}
};