/*
	Dependencies -> None
*/
var Auth = {
	
	prefix : "__pushtext_",

	storeUserCredentials : function(key, username){
		localStorage[this.prefix+"key"] = key;
		localStorage[this.prefix+"username"] = username;
	},

	logout : function(){
		delete localStorage[this.prefix+"key"];
		delete localStorage[this.prefix+"username"];
	},

	getUserKey : function(){
		return localStorage[this.prefix+"key"];
	},

	getUserName : function(){
		return localStorage[this.prefix+'username'];
	},

	isAuthenticated : function(){
		return this.getUserName() && this.getUserKey();
	}
};