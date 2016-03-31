var result = {};
gamedonia.data.search("apm","{}",{
	success:function(trips) {
       trips.forEach(function(triprow) {
          result["myobject"]= triprow;
          var e = gamedonia.data.newEntity();
          e.res = result;
          for(prop in e){
           	 out.println("PROPERTY:  "+prop); 
           }
          gamedonia.data.create("test_rep", e, {
             success: function(res_create) {
                  response.success();
            },
            error: function(error) {
                    log.error(error.message);
                    response.error(error.message);
            }
        });  
        });
       
   }, error:function(error) {
       response.success(error.message);
       
   }    
});