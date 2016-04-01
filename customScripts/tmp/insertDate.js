var params = request.params;
var collectionName1 = params.collection1;
var collectionName2 = params.collection2;
var collectionName3 = params.collection3;

var name1 = params.name1;
var name2 = params.name2;

var entity = gamedonia.data.newEntity();

entity.put("name",name1);
entity.put("date1",new Date());
entity.put("obj", {d2:new Date()});


gamedonia.data.create(collectionName1,entity, {
    success: function(e1) {
    	out.println(e1._id);

    	gamedonia.data.get(collectionName1,e1._id, {
    		success:function(e2){
    	    	out.println(e2.date1);
//    	    	out.println(e2.obj.d2);
    		}
    	});
    	
    	
    	
    }
});