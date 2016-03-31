/**
 */
GamedoniaData={
}
GamedoniaData.count=function(collection,query,callback){
	var encodedQuery=encodeURI(query);
	var url="/v1/data/"+ collection + "/count?query=" + encodedQuery;
	GamedoniaRequest.get(url, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, {
		success:function(data){
			callback.success(data.count);
		},
		error:function(status,response){
			callback.error(status,response);
		}
	});
}
GamedoniaData.update=function(collection,entity,overwrite,callback){
	if (!overwrite) {
		GamedoniaRequest.post("/v1/data/" + collection + "/update", GamedoniaRequest.getApiKey(), entity, [], null,  GamedoniaUsers.sessionToken, callback)
	}
	else{
		GamedoniaRequest.put("/v1/data/" + collection + "/update", GamedoniaRequest.getApiKey(), entity, [], null,  GamedoniaUsers.sessionToken, callback)
	}
}
GamedoniaData.create=function(collection,entity,callback){
	GamedoniaRequest.post("/v1/data/" + collection + "/create", GamedoniaRequest.getApiKey(), entity, [], null,  GamedoniaUsers.sessionToken, callback)
}
GamedoniaData.delete=function(collection,entityId,callback){
	GamedoniaRequest.delete("/v1/data/" + collection + "/delete/" + entityId, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback)
	
}
GamedoniaData.deleteList=function(collection,entityIdsList, deleteAll, callback){
	if(deleteAll){
		GamedoniaRequest.delete("/v1/data/" + collection + "/delete?all=true",GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, {
			success:function(data){
				callback.success(data.deleted)
			},
			error:function(status,response){
				callback.error(status,response);
			}
		});		
	}
	else{
		var entityIds=entityIdsList.join();
		GamedoniaRequest.delete("/v1/data/" + collection + "/delete?keys=" + entityIds, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback)
	}
}
GamedoniaData.get=function(collection,entityId,callback){
	GamedoniaRequest.get("/v1/data/" + collection + "/get/" + entityId, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback)
	
}
GamedoniaData.search=function(collection,query,limit,sort,skip,callback){
	var encodedQuery=encodeURI(query);
	var url="/v1/data/"+ collection + "/search?query=" + encodedQuery;
	if (typeof limit != 'undefined' && limit != null && limit>0) url += "&limit="+limit;
	if (typeof sort != 'undefined' && sort != null) url += "&sort=" + sort;
	if (typeof skip != 'undefined' && skip != null && skip>0) url += "&skip="+skip;
	GamedoniaRequest.get(url, GamedoniaRequest.getApiKey(), [], GamedoniaUsers.sessionToken, callback);
}

