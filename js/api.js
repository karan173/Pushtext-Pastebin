/*
	Dependencies ->
		1) auth.js
*/
var API = {
	
	apiDeveloperKey : "ba7cfe5c936d194b755a4174931bd360",
	
	accessEnum : {
		"public" : 0,
		"unlisted" : 1,
		"private" : 2
	},

	expiryEnum : {
		"never" : "N",
		"10minutes" : "10M",
		"1hour" : "1H",
		"1day" 	: "1D",
		"1week" : "1W",
		"2weeks" : "2W",
		"1month" : "1M"
	},

	//cant use this function due to some reason CHECK
	isGoodResponse : function(response){
		return response && response.length >= 3 && response.substring(0, 3) !== "Bad";
	},

	push : function(text, successCallback, errorCallback){
		var data = {
			api_dev_key: this.apiDeveloperKey,
	        api_option : "paste",
	        api_paste_code : text,  //CHECK
	        api_paste_private : this.accessEnum["unlisted"],
	        api_paste_expire_date : this.expiryEnum["never"]
		};
		if(Auth.isAuthenticated())
		{
			data.api_user_key = Auth.getUserKey();
		}
		var that = this;
		console.log("in push");
		$.ajax({
		    url: "http://pastebin.com/api/api_post.php",
		    data: data,
		    type: "POST",
		    dataType : "text",  //CHECK
		    success: function( response ) {
		    	console.log(response);
		    	if(that.isGoodResponse(response))
		    	{
		    		console.log("here");
		    		successCallback(response);
		    	}
		    	else
		    	{
		    		errorCallback();
		    	}
		    },
		    error: function( xhr, status, errorThrown ) {
		        console.log( "Error: " + errorThrown );
		        console.log( "Status: " + status );
		        console.dir( xhr );
		        errorCallback();
		    }
		});
	},

	authenticate : function(username, password, successCallback, errorCallback){
		var that = this;
		$.ajax({
		    url: "http://pastebin.com/api/api_login.php",
		    data: {
		        api_dev_key: this.apiDeveloperKey,
		        api_user_name : username,
		        api_user_password : password
		    },
		    type: "POST",
		    dataType : "text",  //CHECK
		    success: function( response ) {
		    	if(that.isGoodResponse(response))
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
		        alert( "Sorry, there was a problem!" );
		        console.log( "Error: " + errorThrown );
		        console.log( "Status: " + status );
		        console.dir( xhr );
		        errorCallback();
		    },
		});
	}

};