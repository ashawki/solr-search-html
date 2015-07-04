//function getCookie(cname) {
//	if (document.cookie) {
//		var name = cname + "=";
//		var ca = document.cookie.split(';');
//		for (var i = 0; i < ca.length; i++) {
//			//var c = ca[i].trim();
//			var c = ca[i]; // IE: Object doesn't support property or method 'trim' 
//			if (c.indexOf(name) == 0)
//				return c.substring(name.length, c.length);
//		}
//	}
//	return "";
//}

function getCookie(cookieName) {
	var cookieValue = "";
	if (document.cookie) {
		var index1 = document.cookie.indexOf(cookieName);
		if (0 <= index1) {
			index1 = document.cookie.indexOf("=", index1);
			if (0 <= index1) {
				var index2 = document.cookie.indexOf(";", index1);
				if (0 <= index2) {
					cookieValue = document.cookie.substring((index1 + 1), index2);
				} else {
					cookieValue = document.cookie.substring((index1 + 1));	
				}
			}
		}
	}
	return cookieValue;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

//function checkCookie() {
//	var user = getCookie("username");
//	if (user != "") {
//		alert("Welcome again " + user);
//	} else {
//		user = prompt("Please enter your name:", "");
//		if (user != "" && user != null) {
//			setCookie("username", user, 365);
//		}
//	}
//}
