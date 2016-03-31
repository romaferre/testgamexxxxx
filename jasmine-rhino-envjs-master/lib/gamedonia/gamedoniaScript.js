
GamedoniaScript = {};

GamedoniaScript.run = function (script, parameters, callback) {

	GamedoniaRequest.post("/v1/run/" + script, GamedoniaRequest.getApiKey(), parameters, [], null,  GamedoniaUsers.sessionToken, callback);

}