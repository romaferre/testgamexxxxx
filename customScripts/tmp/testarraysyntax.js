out.println("test array syntax");

var entity = gamedonia.data.newEntity();

entity.put("name","Un nombre");


gamedonia.data.create("prova2",entity, {
    success: function(entity) {  
        gamedonia.data.search("prova2", "{}", {
        	success: function(entities) {
        		out.println("ok concat: " + entities.concat(entities));
        		out.println("ok slice: " + entities.slice(0));
        		for(e in entities){
        		    out.println(e);
        		}
        		entities.forEach(function(e){
        		    out.println(e);
        		});
        	},        	
        	error: function() {
        	
        	}
        });
    },
    error: function(){
        
    }
});