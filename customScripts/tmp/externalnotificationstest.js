gamedonia.operateAsMaster();
out.println("probandoooo")
// Get the current server date (minus 30 days)
var minDateMs = new Date().getTime() - 2592000000;

//Build the query (search ready matches older than 3 minutes)
var query = "{'currentTimeMS': {$lt:" + minDateMs + "}}"

//Perform the query
gamedonia.data.search("externalNotifications", query, {
        success: function(entities) {
    		
			//Get the amount of entities found
			var entitiesSize = entities.size();
            
			//If there are any entities found in ready state, go ahead.
			if(entitiesSize > 0)
            {
			    var i;
				for(i=0; i<entitiesSize; i++)
				{
					//Get rid of the acl before updating for preventing errors.
					entities.get(i).set_acl(null);
					
					//Update the match entity.
					gamedonia.data.remove("externalNotifications", entities.get(i).get_id(), {
						success: function(entity) {
							out.println("[externalNotificationsDelete] OK ");
						},
	
						error: function(error) {
							out.println("[delete external notifications] Error: " + error.code + " " + error.message);
							response.error(error.message);
						}
					});
				}
            }
        },
        error: function(error) {
            log.error("Reading old external notifications : " + request.user.id);
        }
});