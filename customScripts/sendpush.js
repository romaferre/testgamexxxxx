//We get the uid from the request to the script
var uid = request.user.id;
 
//Generate the push and send it
var notification = new Object();
notification.alert = "Push from Server Script!!";
notification.notif_type = "sample-attribute"; //A custom attribute (Optional)
notification.badge = 1; //Set a badge number supported only on iOS.
 
gamedonia.push.send(notification, uid);
 
response.success();