var elo = parseInt(request.params.elo);
var random = parseFloat(request.params.random);
var level = "'"+request.params.level+"'";
var uid = "'"+(request.params.userId).toString()+"'";//request.user.id;

//max retries count
var MAX_RETRIES = 10;
var NUM_OPPONENTS = 3;
//number of fail count
var failCount1  = 0;
var failCount2  = 0;
//bool 0|1 for searching in random 1 or -1
//var randUpp = 0;


var maxElo = elo + 50;
var minElo = elo - 50;


var opponents = new Array();
var uids = new Array();

//log.info("Max ELO: "+maxElo+ " | Min ELO: "+minElo+ " | Level: "+level);

var query = "{ " + buildUidsFilter() + " , 'level' : "+level+" , 'elo':{$lt: " + maxElo + ", $gte: "+minElo+"}, 'random': { $gte : " + random +"}}";



getRandomOpponent();

function getRandomOpponent() 
{
    //log.info("Query is: "+query);
    gamedonia.data.search("games", query, 1,"{'random':1}", 
    {
        success: function(entities) 
        {
        	//Si no hay registros
        	
        	//log.info("entities: "+entities+" | failCount1: "+failCount1+" | failCount2: "+failCount2+ " | equals?: "+(entities == '[]'));
        	if (entities == '[]' && opponents.length < NUM_OPPONENTS)  //typeof(entities.length) == 'undefined'
        	{
        	    //log.info("at random 1 entites null");
            	query = "{ " +buildUidsFilter() + ", 'level' : "+level+" , 'elo':{$lt: " + maxElo + ",  $gte: "+minElo+"}, 'random': { $lte : " + random +"}}";
            	//log.info("Trying to search for random -1");
            	gamedonia.data.search("games", query, 1,"{'random':-1}", 
            	{
                    success: function(entities2) 
                    {
                        //log.info("[RANDOM -1] Entities 2 is: "+entities2+ " | length: "+entities2.length);
                    	//miramos si devuelve algo
                    	if(entities != '[]' || entities2.length > 0) //typeof(entities2.length) != 'undefined'
                    	{
                    	    //Si hay registros cogemos el primero y buscamos otro
                    	    //log.info("[RANDOM -1] Opponent success. Pushiing opponents array with entities.get(0): "+entities2.get(0));
                    	    failCount1 = 0;
        	                failCount2 = 0;
                    	    opponents.push(entities2.get(0));
                        	if (opponents.length < 3) 
                        	{
                        	    //log.info("[RANDOM -1] New opponent found. Opponents count is: "+opponents.length);
                        	    getRandomOpponent();
                        	}
                        	else 
                        	{
                        	    log.info("[RANDOM -1] We have 3 opponents. Returning success!");
                        		var ret = new Object();
                        		ret.opponents = opponents;
                        		response.success(ret);
                        	}    
                    	}
                    	//si no, ampliamos el Elo
                    	else
                    	{
                    	    maxElo += 50;
                            minElo -= 50;
                            //log.info("[RANDOM -1] Trying to find an opponent for level "+level+" with new ELO: "+maxElo+" | "+minElo+" | Number of retries: "+failCount1);
                            failCount1++;
                            
                            //if(failCount1 == MAX_RETRIES)
                            //{
                                //sumamos y restamos 100 pq la primera vez con random 1 ya hicimos el +-50 y no se encontrÃÂÃÂÃÂÃÂ³ nada
                               // maxElo = elo + 100;
                               // minElo = elo - 100;
                            //}
                            
                            getRandomOpponent();
                            
                    	    /*if(failCount1 < MAX_RETRIES)
                    	    {
                    	        
                    	    }
                    	    else
                    	    {
                    	        //log.error("[RANDOM -1] Get opponent failed becaused the search didn't find any opponent. There should be a bot game prepared for level "+level);
                    	        //response.error();
                    	    }*/
                    	    
                    	}
                    	
                	},        	
                	error: function(error) {
                		//response.error("Unable to get another question");
                		//log.info("error on random -1 query");
                	}
                });
        	}
        	else 
        	{
        	    //log.info("[RANDOM 1] Entities 1 is: "+entities+ " | length: "+entities.length);
        	    //log.info("searching in random 1 now");
        	    if(entities != '[]' || entities.length > 0) //typeof(entities.length) != 'undefined'
        	    {
        	       //log.info("[RANDOM 1] first response is not null: "+entities+" | length: "+entities.length);
        	       //log.info("[RANDOM 1] Opponent success. Pushiing opponents array with entities.get(0): "+entities.get(0));
        	       
        	       failCount1 = 0;
	               failCount2 = 0;
        	       opponents.push(entities.get(0));
            	    if (opponents.length < 3) {
            	       //log.info("[RANDOM 1] New opponent found. Opponents count is: "+opponents.length);
            	       query = "{ " + buildUidsFilter() + " , 'level' : "+level+" , 'elo':{$lt: " + maxElo + ", $gte: " + minElo + "}, 'random': { $gte : " + random +"}}";
                	   getRandomOpponent();
                	}else {
                	    log.info("[RANDOM 1] We have 3 opponents. Returning success!");
                		var ret = new Object();
                        ret.opponents = opponents;
                        response.success(ret);                
                	}   
        	    }
        	    else
        	    {
        	        //log.info("[RANDOM 1] Response is null");
        	        if(opponents.length < NUM_OPPONENTS)//(failCount2 < MAX_RETRIES)
            	    {
            	        maxElo += 50;
                        minElo -= 50;
                        //log.info("[RANDOM 1] Trying to find an opponent for level "+level+" with new ELO: "+maxElo+" | "+minElo+" | Number of retries: "+failCount2);
                        failCount2++;
                        query = "{ " + buildUidsFilter() + " , 'level' : "+level+" , 'elo':{$lt: " + maxElo + ", $gte: " + minElo + "}, 'random': { $gte : " + random +"}}";
                        getRandomOpponent();
            	    }
					//this should not happen
            	    /*{
            	        log.error("[RANDOM 1] Get opponent failed becaused the search didn't find any opponent. There should be a bot game prepared for level "+level);
            	        response.error();
            	    }*/
        	    }
        	    
        	}
    	},        	
    	error: function(error) {
    		//response.error("Unable to get another question");
    		log.info("error on random 1 query");
    	}
    });
}

function buildUidsFilter() {

	var filter = "'uid': {$nin:[";
	for (var i=0;i<opponents.length;i++) {
		if (i!=0) filter += ",";
		//filter += "'"+opponents[i].get_id()+"'";
		filter += "'"+opponents[i].get("uid")+"'";	
	}
	
	if (opponents.length > 0) {
		filter += ",";
	}
	
	filter += uid + "]}";	
	
	return filter;
}
