/*
	Dependencies -> api_enums.js
					config.js
*/
Options = {
	
	prefix : "__pushtext_",

	setAccessGuest : function(str){
		if(ApiEnums.accessEnum.hasOwnProperty(str))
		{
			localStorage[this.prefix+"access_guest"] = str;
		}
		return this;
	},

	getAccessGuest : function(){
		var val = localStorage[this.prefix+"access_guest"]; 
		return val ? val : Config.defaults.accessGuest;
	},

	setAccessUser : function(str){
		if(ApiEnums.accessEnum.hasOwnProperty(str))
		{
			localStorage[this.prefix+"access_user"] = str;
		}
		return this;
	},

	getAccessUser : function(){
		var val = localStorage[this.prefix+"access_user"];
		return val ? val : Config.defaults.accessUser;
	},

	setExpiry : function(str){
		if(ApiEnums.expiryEnum.hasOwnProperty(str))
		{
			localStorage[this.prefix+"expiry"] = str;
		}
		return this;
	},

	getExpiry : function(){
		var val = localStorage[this.prefix+"expiry"];
		return val ? val : Config.defaults.expiry;
	}
};