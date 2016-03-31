/**
 * 
 */

/*
GamedoniaRequest={
		gameSecret:"751a5f58ede4e4590895b7fbc9509e0c",
	    devMaster:"6650117d-d1da-4ad3-903c-54bd2f1eadd8",
	    devNormal:"ec546fd8-805a-48b0-beeb-3c00e568bcd4",
	    prodMaster:"ab181ea3-9b57-44a9-bc9d-954fb2e1aa04",
	    prodNormal:"a9e5f82c-e596-4409-b678-4716ea598d05",
		API:"http://staging.gamedonia.com:8080",
		production:false
}
*/

GamedoniaRequest={
        gameSecret:"b08bf02bab9a1e93ee18c07804e853c0",
        devMaster:"d5d41234-4cac-4260-afec-b9eba0108410",
        devNormal:"9490faf3-b418-4ed0-b860-dd138169d94e",
        prodMaster:"9c302513-3fb9-4177-9b0a-534dfc179700",
        prodNormal:"dce14eeb-98b6-42c4-860f-b60a5cfcfc4d",
        API:"http://api.gamedonia.com",
        production:false
}

GamedoniaRequest.get=function(){
	
}
GamedoniaRequest.getApiKey=function(){
	return GamedoniaRequest.production?GamedoniaRequest.prodNormal:GamedoniaRequest.devNormal;
}

GamedoniaRequest.sign=function(apiKey,secret,data,contentType,date,requestMethod, path){
	//algoritmo de firma compatible con la API de servidor de Gamedonia,
	//usando la libreria cripto-js (ver el fichero 'index.html' para ver las referencias a los scripts)
	//se usa para POST y PUT
	var contentMd5 = CryptoJS.MD5(data).toString( CryptoJS.enc.Hex);
	var toSign = requestMethod + "\n" + contentMd5 + "\n" + contentType + "\n" + date + "\n" + path;				
	var calculatedSignature = CryptoJS.HmacSHA1(toSign,secret);
	return calculatedSignature.toString( CryptoJS.enc.Hex);	
}
GamedoniaRequest.signGetOrDelete=function signGetOrDelete(apiKey,secret,date,requestMethod, path){
	//algoritmo de firma compatible con la API de servidor de Gamedonia,
	//usando la libreria cripto-js (ver el fichero 'index.html' para ver las referencias a los scripts)
	//se usa para GET y DELETE
	var split = path.split("?");
	var toSign = requestMethod + "\n" + date + "\n" + split[0];				
	var calculatedSignature = CryptoJS.HmacSHA1(toSign,secret);
	return calculatedSignature.toString( CryptoJS.enc.Hex);	
}

GamedoniaRequest.putOrPost=function(method, path, apiKey, data, headers, auth, sessionToken, callback){
    var url = GamedoniaRequest.API + path;

    var http = new XMLHttpRequest();
    http.open(method, url, true);
    for(var key in headers){
    	http.setRequestHeader(key, headers[key]);
    }
    
    if (typeof data != 'undefined' && data != null){
        var contentType = "application/json";
        //var d = http.getRequestHeader("Date");
        http.setRequestHeader("Content-type",contentType);
	    	// la fecha actual convertida a tiempo UTC
	    var formattedDate = new Date().toUTCString();
	
	    //el objeto JSON convertido a string
	    var stringified = JSON.stringify(data);
	    //obtenemos el header signature a partir de la apiKey de desarrollo (para este ejemplo)
	    //el secret del juego, el objeto JSON pasado a string, el contentType, la fecha
	    //formateada a UTC, el método HTTP (POST en este caso) y el path ( empezando por /v1...)
	    
	    var signature = GamedoniaRequest.sign(apiKey, GamedoniaRequest.gameSecret,stringified,contentType, formattedDate, method, path);
	
	    //creamos la cabecera de X-Gamedonia-Signature
	    http.setRequestHeader("X-Gamedonia-Signature",signature);
	    //y la cabecera X-Date
	    http.setRequestHeader("X-Date",formattedDate);

	}
    http.setRequestHeader("X-Gamedonia-ApiKey",apiKey);
    if (typeof auth != 'undefined' && auth != null){
	    http.setRequestHeader("Authorization",auth);    	
    }
    if (typeof sessionToken != 'undefined' && sessionToken != null){
	    http.setRequestHeader("X-Gamedonia-SessionToken",sessionToken);    	
    }
  
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200) {
            console.log('Ready:',http.responseText);
            var responseContentType = http.getResponseHeader("Content-type");
            var data = null;
            if(responseContentType && responseContentType.indexOf("application/json")!=-1){
            	data=JSON.parse(http.responseText);
            }
            if(callback && callback.success && typeof callback.success === "function") callback.success(data);
        }
        else{
            if(http.readyState == 4 && callback && callback.error && typeof callback.error === "function")  callback.error(http.status, http.responseText);
        }
    }

    //enviamos el objeto JSON pasado a String
    http.send(stringified);
}
GamedoniaRequest.post=function(path, apiKey, data, headers, auth, sessionToken, callback){
	GamedoniaRequest.putOrPost("POST", path, apiKey, data, headers, auth, sessionToken, callback)
}
GamedoniaRequest.put=function(path, apiKey, data, headers, auth, sessionToken, callback){
	GamedoniaRequest.putOrPost("PUT", path, apiKey, data, headers, auth, sessionToken, callback)
}

GamedoniaRequest.deleteOrGet=function(method, path, apiKey, headers, sessionToken, callback){
    var url = GamedoniaRequest.API + path;

    var http = new XMLHttpRequest();
    http.open(method, url, true);
    for(var key in headers){
    	http.setRequestHeader(key, headers[key]);
    }
    var formattedDate = new Date().toUTCString();
	
    //el objeto JSON convertido a string
    //obtenemos el header signature a partir de la apiKey de desarrollo (para este ejemplo)
    //el secret del juego, el objeto JSON pasado a string, el contentType, la fecha
    //formateada a UTC, el método HTTP (POST en este caso) y el path ( empezando por /v1...)
    
    var signature = GamedoniaRequest.signGetOrDelete(apiKey, GamedoniaRequest.gameSecret, formattedDate, method, path);

    //creamos la cabecera de X-Gamedonia-Signature
    http.setRequestHeader("X-Gamedonia-Signature",signature);
    //y la cabecera X-Date
    http.setRequestHeader("X-Date",formattedDate);
    http.setRequestHeader("X-Gamedonia-ApiKey",apiKey);
    if (typeof sessionToken != 'undefined' && sessionToken != null){
	    http.setRequestHeader("X-Gamedonia-SessionToken",sessionToken);    	
    }
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200) {
            console.log('Ready:',http.responseText);
            var responseContentType = http.getResponseHeader("Content-type");
            var data = null;
            if(responseContentType && responseContentType.indexOf("application/json")!=-1){
            	data=JSON.parse(http.responseText);
            }
            if(callback && callback.success && typeof callback.success === "function") callback.success(data);
        }
        else{
            if(http.readyState == 4 && callback && callback.error && typeof callback.error === "function")  callback.error(http.status, http.responseText);
        }
    }
    http.send();
}
 GamedoniaRequest.get=function(path, apiKey, headers, sessionToken, callback){
	 GamedoniaRequest.deleteOrGet("GET", path, apiKey, headers, sessionToken, callback)
 }
 GamedoniaRequest.delete=function(path, apiKey, headers, sessionToken, callback){
	 GamedoniaRequest.deleteOrGet("DELETE", path, apiKey, headers, sessionToken, callback)
 }
GamedoniaRequest.encodeBase64=function(rawStr){
		var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
		return CryptoJS.enc.Base64.stringify(wordArray);
}


