
gamedonia.data.search("prova3", "{}", {
        	success: function(entities) {
        		var i = 0;
        		var concat1 ="";
        		for (entity in Iterator(entities)) {
        			if(entity.lorem){
                        gamedonia.println(i++);
                        concat1+=entity.lorem[0];
        			}
        		} 
        	},        	
        	error: function(error) {
        		gamedonia.println("KO");
        	}
        });