var ops = [];
var query_update = "{score:103}";
//var update = "{\"name\":{\"@ISODate\":\"2016-01-14T15:38:45Z\"}}";
var update = "{'name':{'@ISODate':'2016-01-14T15:38:45Z'}}";

var opp=gamedonia.data.createUpdate(query_update,update);
ops.push(opp);

gamedonia.data.runBulkOperations("prova3",ops,{
    
    success:function(result) {
        response.success(result);
    },
    error:function(error) {
        response.success(error);
    }
});