var responseData = new Array();
var open = "{}";//$and:[{$or:[{\"u1.uid\":\"" + request.params.uid + "\"},{\"u2.uid\":\"" + request.params.uid + "\"}]},{$or:[{\"s\":\"pending_approval\"},{\"s\":\"playing\"}]}]}";
//var finished = "{$and:[{$or:[{\"u1.uid\":\"" + request.params.uid + "\"},{\"u2.uid\":\"" + request.params.uid + "\"}]},{\"s\":\"finished\"}]}";
var finished = "{}";//$and:[{$or:[{$and:[{\"u1.uid\":\"" + request.params.uid + "\"},{$or:[{\"u1.rd\":{$exists:false}},{$where:\"this.u1.rd < this.d\"}]}]},{$and:[{\"u2.uid\":\"" + request.params.uid + "\"},{$or:[{\"u2.rd\":{$exists:false}},{$where:\"this.u2.rd < this.d\"}]}]}]},{\"s\":\"finished\"}]}";
var limit = 15;

//Recoger el limite de partidas finalizadas
gamedonia.data.search("prova2", "{}", {
    success: function(entities) { 
    			//limit = entities.get(0).get("limitMatchesSearch");
				getOpenMatches();
        	 },        	
    error: function(error) {
    		log.error(error.message);
    		getOpenMatches();
    }
});


function getOpenMatches() {
	//Recoger la lista de partidas abiertas
	gamedonia.data.search("prova2", open, {
    	success: function(entities) { 
    		getOpenFinished(entities);
    	}, 
    	error: function(error) {
        	response.error(error.message);
        }
    });
}

function getOpenFinished(matches) {
	//Recoger la lista de partidas completadas
	gamedonia.data.search("prova2", finished, limit, "{d:-1}", {
    	success: function(entities) { 
    		if (matches != null) {
    			matches=matches.concat(entities);
    			out.println(">>>>>>>>>>>>>>>>>>> " + matches.length);
    			out.println(">>>>>>>>>>>>>>>>>>> " + matches);
    			matches.forEach(
    			    function(entry) {
        			    out.println(">>>>>>>>>>>>>>>>> -> " + entry._id);
        			    out.println(">>>>>>>>>>>>>>>>> -> " + entry.extId);
                    });
    		}else {
    			matches = entities;
    		}
    		response.success(matches);
    	}, 
    	error: function(error) {
        	response.error(error.message);
        }
    });
}
