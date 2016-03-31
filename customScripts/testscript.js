function stampMatch(id,uid,rd) {
   gamedonia.data.get("prova2", id, {
       success: function(entity) {            
                   var match = new EntityData();
                   match.setObjectId(entity.get_id());
                   
                   var date = new EntityData();
                   date.put("rd", rd);
           
                   if (entity.get("u1").get("uid").equals(uid)) 
                       match.put("u1", date);
                   else
                       match.put("u2", date);
                         
                   updateMatch(match);                         
       },            
       error: function(error) {
                   log.error("Error stampMatch with id (" + id +"): " + error.message);
       }
   });
}
function updateMatch(match) {
    gamedonia.data.update("prova2", match, {
       success: function (entity) {
           //log.info("Success stampMatch: " + entity.get_id());  
       },
       error: function(error) {
           log.error("Error updateMatch (" + match.get_id() + "): " + error.message);
       }
   }); 
}
var pars =  {"uid":"5593a7d17ceadd67380ca9e6","ids":["5593abd53d060cbf463bd474"],"rd":"20150701084415"};
stampMatch(pars.ids[0],pars.uid,pars.rd);

