/**
 * 
 * 
 */

GamedoniaUsers={
	token: undefined,
	get sessionToken() {
		if (this.token == undefined) this.token=readCookie("gd_session_token");
		return this.token;
	},

	set sessionToken(x) {
        this.token = x;
    }

}

GamedoniaUsers.createUser=function(user,callback){
	GamedoniaRequest.post("/v1/account/create",GamedoniaRequest.getApiKey(), user, [],  null,  GamedoniaUsers.sessionToken, callback);
}
GamedoniaUsers.loginWithStringToken=function(stringToken,callback){
	var auth = GamedoniaRequest.encodeBase64(stringToken);
	GamedoniaRequest.post("/v1/account/login", GamedoniaRequest.getApiKey(), null, [], auth, null, {
		success:function(data){
			GamedoniaUsers.sessionToken=data.session_token;
			createCookie("gd_session_token", data.session_token,14);
			callback.success();
		},
		error:function(status,text){
			callback.error(status,text);
		}
	}
	);
}
GamedoniaUsers.restorePassword=function(restoreToken, newPassword,callback){
	GamedoniaRequest.post("/v1/account/password/restore/" + restoreToken, GamedoniaRequest.getApiKey(),  {"password":newPassword}, [], null,  GamedoniaUsers.sessionToken, callback);		
}
GamedoniaUsers.loginUserWithEmail=function(email, password,callback){
	GamedoniaUsers.loginWithStringToken("email|"+email+"|"+password,callback);
}
GamedoniaUsers.loginUserWithGameCenterId=function(id,callback){
	GamedoniaUsers.loginWithStringToken("gamecenter|" + id,callback);
}
GamedoniaUsers.loginUserWithOpenUDID=function(id,callback){
	GamedoniaUsers.loginWithStringToken("silent|" + id,callback);
}
GamedoniaUsers.loginUserWithFacebook=function(fbuid,fbAccessToken,callback){
	GamedoniaUsers.loginWithStringToken("facebook|" + fbuid + "|" + fbAccessToken,callback);
}
GamedoniaUsers.loginUserWithTwitter=function(twuid,twTokenSecret,twToken,callback){
	GamedoniaUsers.loginWithStringToken("twitter|" + twuid + "|" + twTokenSecret + "|" + twToken,callback);
}
GamedoniaUsers.loginUserWithSessionToken=function(callback){
	GamedoniaUsers.loginWithStringToken("session_token|" + GamedoniaUsers.sessionToken);
}
GamedoniaUsers.logoutUser=function(callback){
	GamedoniaRequest.post("/v1/account/logout", GamedoniaRequest.getApiKey(),  {"X-Gamedonia-SessionToken":GamedoniaUsers.sessionToken}, [], null,  GamedoniaUsers.sessionToken, {
		success:function(data){			
			eraseCookie("gd_session_token");
			callback.success();
		},
		error:function(status,text){
			callback.error(status,text);
		}
	});
}
GamedoniaUsers.getUser=function(userId,callback){
	GamedoniaRequest.post("/v1/account/retrieve", GamedoniaRequest.getApiKey(),  {"_id":userId}, [], null,  GamedoniaUsers.sessionToken, callback);
}
GamedoniaUsers.getMe=function(callback){
	GamedoniaRequest.get("/v1/account/me", GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback);
}
GamedoniaUsers.linkUser=function(credentials,callback){
	GamedoniaRequest.post("/v1/account/link", GamedoniaRequest.getApiKey(),  credentials, [], null,  GamedoniaUsers.sessionToken, callback);
}
GamedoniaUsers.update=function(profile,overwrite,callback){
	if (!overwrite) {
		GamedoniaRequest.post("/v1/account/update", GamedoniaRequest.getApiKey(), profile, [], null,  GamedoniaUsers.sessionToken, callback)
	}
	else{
		GamedoniaRequest.put("/v1/account/update", GamedoniaRequest.getApiKey(), profile, [], null,  GamedoniaUsers.sessionToken, callback)
	}
}
GamedoniaUsers.changePassword=function(email,currentPassword,newPassword,callback){
	var auth = GamedoniaRequest.encodeBase64("email|"+email+"|"+currentPassword);
	GamedoniaRequest.post("/v1/account/password/change", GamedoniaRequest.getApiKey(), {password:newPassword}, [], auth, null, callback)
}
GamedoniaUsers.resetPassword=function(email,callback){
	GamedoniaRequest.post("/v1/account/password/reset", GamedoniaRequest.getApiKey(),  {"email":email}, [], null,  GamedoniaUsers.sessionToken, callback);	
}
GamedoniaUsers.count=function(query,callback){
	var encodedQuery=encodeURI(query);
	var url="/v1/account/count?query=" + encodedQuery;
	GamedoniaRequest.get(url, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, {
		success:function(data){
			callback.success(data.count);
		},
		error:function(status,response){
			callback.error(status,response);
		}
	});
}
GamedoniaUsers.search=function(query,limit,sort,skip,callback){
	var encodedQuery=encodeURI(query);
	var url="/v1/account/search?query=" + encodedQuery;
	if (typeof limit != 'undefined' && limit != null && limit>0) url += "&limit="+limit;
	if (typeof sort != 'undefined' && sort != null) url += "&sort=" + sort;
	if (typeof skip != 'undefined' && skip != null && skip>0) url += "&skip="+skip;
	GamedoniaRequest.get(url, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback);
}
