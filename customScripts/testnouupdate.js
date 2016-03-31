var entity = gamedonia.data.newEntity();

entity.put("name","Un nombre");


gamedonia.data.create("rooms2",entity, {
    success: function(entity) {        
        
        entity.put("phone","647448417");
        var entity2 = gamedonia.data.newEntity();
        entity2.setObjectId(entity.get_id());
        entity2.put("phone","1234");
        gamedonia.data.update("rooms2", entity2, true, {
        	success: function(entity) {
        		out.println("ok: " + entity.get("phone"));
        		out.println("ok: " + entity.get("name"));
        	},        	
        	error: function() {
                out.println(err);
        	}
        });
    },
    error: function(err){
        out.println(err);
    }
});
