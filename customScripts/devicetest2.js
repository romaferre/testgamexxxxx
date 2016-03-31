/**
 * 
 * 
 * 
 * {
   "_id" : ObjectId("56deffd6da06cca39b5956dc"),
   "deviceType" : "android",
   "deviceId" : "f754cf1ca3f13ffe",
   "language" : "es",
   "country" : "ES",
   "timeZoneGMTOffset" : 1,
   "pushEnabled" : true,
   "lastPushFailed" : false,
   "uid" : "56deffd4da06cca39b5956db",
   "device" : "androidp",
   "platform" : "android",
   "buildVersion" : "1.0",
   "os" : "android",
   "osVersion" : "4.1.2",
   "imei" : "359651048288234",
   "idfa" : "9aa6008d-8049-46ef-a41b-16514408159f",
   "deviceManufacturer" : "samsung",
   "deviceModel" : "GT-I9100",
   "deviceHardware" : "armeabi-v7a",
   "adTrackingEnabled" : true,
   "jailbroken" : false,
   "custom" : {
       "myvar2" : "MyValue2"
   },
   "_md" : {
       "ct" : ISODate("2016-03-08T16:37:42.369Z"),
       "lmt" : ISODate("2016-03-16T14:10:30.336Z")
   }
}
 * 
var theDevice = 		{
			   "_id" : "56deffd6da06cca39b5956dc",
			   "deviceType" : "android",
			   "deviceId" : "f754cf1ca3f13ffe",
			   "language" : "es",
			   "country" : "ES",
			   "timeZoneGMTOffset" : 1,
			   "pushEnabled" : true,
			   "lastPushFailed" : false,
			   "uid" : "56deffd4da06cca39b5956db",
			   "device" : "androidp",
			   "platform" : "android",
			   "buildVersion" : "1.0",
			   "os" : "android",
			   "osVersion" : "4.1.2",
			   "imei" : "359651048288234",
			   "idfa" : "9aa6008d-8049-46ef-a41b-16514408159f",
			   "deviceManufacturer" : "samsung",
			   "deviceModel" : "GT-I9100",
			   "deviceHardware" : "armeabi-v7a",
			   "adTrackingEnabled" : true,
			   "jailbroken" : false,
			   "custom" : {
			       "myvar2" : "MyValue2"
			   },
			   "_md" : {
			       "ct" : "2016-03-08T16:37:42.369Z",
			       "lmt" : "2016-03-16T14:10:30.336Z"
			   }
			};
 */

var theDevice = 		{
			   "_id" : "56deffd6da06cca39b5956dc",
			   "deviceType" : "android",
			   "deviceId" : "f754cf1ca3f13ffe",
			   "language" : "es",
			   "country" : "ES",
			   "timeZoneGMTOffset" : 1,
			   "pushEnabled" : true,
			   "lastPushFailed" : false,
			   "uid" : "56deffd4da06cca39b5956db",
			   "device" : "androidp",
			   "platform" : "android",
			   "buildVersion" : "1.0",
			   "os" : "android",
			   "osVersion" : "4.1.2",
			   "imei" : "359651048288234",
			   "idfa" : "9aa6008d-8049-46ef-a41b-16514408159f",
			   "manufacturer" : "samsung",
			   "model" : "GT-I9100",
			   "hardware" : "armeabi-v7a",
			   "adTrackingEnabled" : true,
			   "jailbroken" : false,
			   "custom" : {
			       "myvar2" : "MyValue2"
			   },
			   "_md" : {
			       "ct" : "2016-03-08T16:37:42.369Z",
			       "lmt" : "2016-03-16T14:10:30.336Z"
			   }
			};

var device = request.device;
var theUid = request.params.theUid;
var results =[];
//results.push(device._id=="56deffd6da06cca39b5956dc");
results.push({field:"deviceType", expected:"android",actual:device.deviceType});
results.push({field:"deviceId", expected:"f754cf1ca3f13ffe",actual:device.deviceId});
results.push({field:"language", expected:"es",actual:device.language});
results.push({field:"country", expected:"ES",actual:device.country});
results.push({field:"timeZoneGMTOffset", expected:1,actual:device.timeZoneGMTOffset});
results.push({field:"pushEnabled", expected:true,actual:device.pushEnabled});
results.push({field:"lastPushFailed", expected:false,actual:device.lastPushFailed});
//results.push({field:"uid", expected:"android",actual:device.deviceType});
results.push({field:"device", expected:"androidp",actual:device.device});
results.push({field:"platform", expected:"android",actual:device.platform});
results.push({field:"osVersion", expected:"4.1.2",actual:device.osVersion});
results.push({field:"imei", expected:theDevice.imei,actual:device.imei});
results.push({field:"idfa", expected:theDevice.idfa,actual:device.idfa});
results.push({field:"manufacturer", expected:theDevice.manufacturer,actual:device.manufacturer});
results.push({field:"model", expected:theDevice.model,actual:device.model});
results.push({field:"hardware", expected:theDevice.hardware,actual:device.hardware});
results.push({field:"adTrackingEnabled", expected:theDevice.adTrackingEnabled,actual:device.adTrackingEnabled});
results.push({field:"jailbroken", expected:theDevice.jailbroken,actual:device.jailbroken});
results.push({field:"custom.myvar2", expected:theDevice.custom.myvar2,actual:device.custom.myvar2});
var lmt=device._md.lmt;
var ct=device._md.ct;
results.push({field:"_md.lmt", expected:true,actual:isDate(lmt)});
results.push({field:"_md.ct", expected:true,actual:isDate(ct)});

//results.push(device.deviceId=="f754cf1ca3f13ffe");
//results.push(device.language=="es");
//results.push(device.country=="ES");
//results.push(device.timeZoneGMTOffset==1);
//results.push(device.pushEnabled==true);
//results.push(device.lastPushFailed==false);
//out.println("UID: " + device.uid.toString());
//results.push(device.uid==theUid);
//results.push(device.device=="androidp");
//results.push(device.platform=="android");
//results.push(device.osVersion=="4.1.2");
//results.push(device.imei=="359651048288234");
//results.push(device.idfa=="9aa6008d-8049-46ef-a41b-16514408159f");
//results.push(device.manufacturer=="samsung");
//results.push(device.model=="GT-I9100");
//results.push(device.hardware=="armeabi-v7a");
//results.push(device.adTrackingEnabled==true);
//results.push(device.jailbroken==false);
//results.push(device.custom.myvar2=="MyValue2");


function isDate(myDate) {
    return myDate.constructor.toString().indexOf("Date") > -1;
} 

//results.push(isDate(ct));
//results.push(isDate(lmt));

results.forEach(function(r){
	if(r.expected!=r.actual){
		out.println("FIELD failed:" + r.field + ". Expected: " + r.expected + ". Got:" + r.actual);
//		response.returnError(results);
	}
	else{
		out.println("FIELD succeeded:" + r.field + ". Expected: " + r.expected + ". Got:" + r.actual);
	}
});
response.returnSuccess(results);