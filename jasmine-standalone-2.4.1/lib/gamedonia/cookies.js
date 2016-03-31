function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
    host = location.host;
    if (host.split('.').length === 1)
    {
       // no "." in a domain - it's localhost or something similar
       document.cookie = name+"="+value+expires+"; path=/";
    }
    else
    {
       domainParts = host.split('.');
       domainParts.shift();
       domain = '.'+domainParts.join('.');

       document.cookie = name+"="+value+expires+"; path=/; domain="+domain;

       // check if cookie was successfuly set to the given domain
       // (otherwise it was a Top-Level Domain)
       if (readCookie(name) == null || readCookie(name) != value)
       {
          // append "." to current domain
          domain = '.'+host;
          document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
       }
    }
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}