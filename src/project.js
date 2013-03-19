(function(window) {
	var index = 1;
	var handlers = {};
	function Main() {
		if (window.templateLoadComplete == true) {
			onDataLoaded();
		} else {
			Event.addListener(window, "TEMPLATE_DATA_LOADED", onDataLoaded);
		}

	}

	function onDataLoaded() {
		var index =loadParams.getValue("index");
		if(!index)return;
		var content ={};
		
		for (var a = 0; a < window.data["index.html"].length; a++) {
			var item = window.data["index.html"][a];
			switch(item.id)
			{
				case "workTitle" + index:
				content.title = item.value;
				break;
				case "workSubTitle" + index:
				content.subtitle = item.value;
				break;
				case "workText" + index:
				content.text = item.value;
				break;
				case "workImage" + index:
				content.image = item.value;
				break;
				case "workClient" + index:
				content.client = item.value;
				break;
				case "workAgency" + index:
				content.agency = item.value;
				break;
				case "workHonours" + index:
				content.honours = item.value;
				break;
			}
		}
		createProject(content);
	}

	function createProject(item) {
		document.getElementById("workTitle").innerHTML = item.title?item.title:"";
		document.getElementById("workSubTitle").innerHTML = item.subtitle?item.subtitle:"";
		document.getElementById("workCopy").innerHTML = item.text?item.text:"";
		document.getElementById("workClient").innerHTML = item.client?item.client:"";
		document.getElementById("workAgency").innerHTML = item.agency?item.agency:"";
		document.getElementById("workHonours").innerHTML = item.honours?item.honours:"";
		document.getElementById("workImage").src = item.image?"admin/resource/image/"+item.image:"";
	}

	

	var loadParams = {
		getValue : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null)
				return "";
			else
				return results[1];
		},
		getHostURL : function() {
			var url = new String(document.URL.replace(/\/[^\/]+$/, ''));
			if (url.charAt(url.length - 1) != "/")
				url = url + "/";
			return url;
		}
	}
	 Main();
})(window);
