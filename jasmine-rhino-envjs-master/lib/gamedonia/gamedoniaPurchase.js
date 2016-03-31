


GamedoniaPurchase = {};

GamedoniaPurchase.buyProduct = function (productId, callback) {

	var purchase = {
		'productId': productId
	};

	GamedoniaRequest.post("/v1/purchase/buy/paypal", GamedoniaRequest.getApiKey(), purchase, [], null,  GamedoniaUsers.sessionToken,  {
		success:function(data){
			//Procesamos el retorno de la compra
			//Hay que hacer la redirección
			var urlObj = GamedoniaPurchase.findUrl("approval_url",data.links);
			window.location.replace(urlObj.href);

		},
		error:function(status,response){
			callback(status,response);
		}
	});

}

GamedoniaPurchase.consumePayment = function (payment, callback) {

	GamedoniaRequest.post("/v1/purchase/consume/paypal", GamedoniaRequest.getApiKey(), payment, [], null,  GamedoniaUsers.sessionToken, callback);

}


GamedoniaPurchase.findUrl = function (urlName,links) {

	for (var i=0;i<links.length;i++) {

		var link = links[i];
		if (link.rel == urlName) return link;

	}

	return null;

} 

GamedoniaPurchase.onLoadPurchases = function () {

	//Parse params
	var urlParams = location.search.split(/[?&]/).slice(1).map(function(paramPair) {
        return paramPair.split(/=(.+)?/).slice(0, 2);
    }).reduce(function (obj, pairArray) {            
        obj[pairArray[0]] = pairArray[1];
        return obj;
    }, {});


	//Detect payment method
	if (urlParams.paymentId != undefined && urlParams.token != undefined && urlParams.PayerID != undefined) {

		//Execute Payment
		console.log("PayPal payment");
		var payment = {
			'paymentId':urlParams.paymentId,
			'PayerID':urlParams.PayerID
		}

		GamedoniaPurchase.consumePayment(payment,{
			success:function(data){								
				if (GamedoniaPurchase.buyProductCallback != undefined) GamedoniaPurchase.buyProductCallback.success(data);			
			},
			error:function(status,response){
				if (GamedoniaPurchase.buyProductCallback != undefined) GamedoniaPurchase.buyProductCallback.error(status,response);
			}
		});

	}else if (urlParams.paymentId == undefined && urlParams.token != undefined && urlParams.PayerID == undefined) {

		if (GamedoniaPurchase.buyProductCallback != undefined) GamedoniaPurchase.buyProductCallback.error(400,{});

	}
}



window.addEventListener("load", GamedoniaPurchase.onLoadPurchases, false);

