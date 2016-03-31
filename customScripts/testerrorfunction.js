//TODO: not found

 gamedonia.operateAsMaster();
log.info("testttttt");
new_Player2Id="539b356fe4b0e471e3557b8b";
var newTotalPointsP2=10;
				gamedonia.user.get(new_Player2Id, {
					success: function(user) {    	
						
						if (user)
						{
				gamedonia.user.get(new_Player2Id, {
					success: function(user) {    	
						
						if (user)
						{
out.println("user2");

gamedonia.data.search("Leaderboard", "{playerid: \"" + new_Player2Id + "\" }", {
	success: function(leaderboardEntries) {
		//if not found something is wrong..
		if (leaderboardEntries.size() > 0 )
		{
			//update the val
			var leaderboardEntry = leaderboardEntries.get(0);										
			leaderboardEntry.put("score", newTotalPointsP2);
			leaderboardEntry.put("name", user.profile.profilename);

			gamedonia.data.update("Leaderboard", leaderboardEntry.get_id(), leaderboardEntry, {
				success: function(results) {
					response.success(results);
				}
				, 
				error: function(error) {
					response.error(error.message);
				}  
			});										
		}
		else		
		{
			//create the entry
			var leaderboardEntry = gamedonia.data.newEntity(); 
			
			leaderboardEntry.put("playerid", new_Player2Id);
			leaderboardEntry.put("score", newTotalPointsP2);
			leaderboardEntry.put("name", user.profile.profilename);
				
			gamedonia.data.create("Leaderboard", leaderboardEntry, {
				success: function(results) {}, error: function(error) {}
			});
		}
	}
})
}
}});
						}
					}});

