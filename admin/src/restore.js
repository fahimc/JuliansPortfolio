(function(window) {
	var user = "";
	var pass = "";
	var dataLocation = "../data.json";
	var content;
	var currentPage = "";
	var currentIndex = 0;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Utensil.URLLoader.load("admin.json?rand=" + Math.random(), adminLoaded);
		
	}

	function adminLoaded(t, x) {
		var data = (eval('(' + t + ')'));
		user = data.username;
		pass = data.password;
		showLogin();
		Utensil.addListener(document.getElementById('formIframe'), "load", dataUpdated);
	}

	function showLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('user');
		var p = document.getElementById('pass');
		Utensil.addListener(submit, "click", onSubmitClicked);
		Utensil.addListener(un, "focus", onFocus);
		Utensil.addListener(p, "focus", onFocus);
		document.getElementById('login').style.display = "block";
		document.getElementById('spacer').style.display = "block";
	}

	function hideLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('user');
		var p = document.getElementById('pass');
		Utensil.removeListener(submit, "click", onSubmitClicked);
		Utensil.removeListener(un, "focus", onFocus);
		Utensil.removeListener(p, "focus", onFocus);
		document.getElementById('login').style.display = "none";
		document.getElementById('spacer').style.display = "none";
	}

	function onFocus() {
		document.getElementById('loginError').innerHTML = "&nbsp;";
	}

	function onSubmitClicked(event) {
		var un = document.getElementById('user');
		var p = document.getElementById('pass');
		if (un.value == user && p.value == pass) {
			Utensil.URLLoader.load("lib/restore.php", dataUpdated,"POST","id=restore");
		} else {
			document.getElementById('loginError').innerHTML = "*invalid login details";
		}
	}

	function logIn() {
		
		hideLogin();
		showWrapper();
	}
	function showWrapper() {
		document.getElementById("wrapper").style.display = "block";
		
	}
	function dataUpdated(t) {

		switch(t) {
			case "done":
				break;
			case "error":
				break;
		}
		setTimeout(function() {
			document.getElementById('backdrop').style.display = "none";
			document.getElementById('progress').style.display = "none";
			logIn();
		}, 1000);

	}
	Main();
})(window);
