(function(window) {
var index = 1;
	function Main() {
		
		Event.addListener(window,"TEMPLATE_DATA_LOADED",onDataLoaded);
		
		
		

	}
	function onDataLoaded()
	{
		for (var a = 0; a < window.data["index.html"].length; a++) {
			var item = window.data["index.html"][a];
			if (item.id == "workImage" + index) {
				createWorkThumb(item);
				index++;
			}
		}
	}
	function createWorkThumb(item) {
		var li = document.createElement("li");
		var img = new Image();
		img.src= "admin/resource/image/"+item.value;
		li.appendChild(img);
		document.getElementById("work").appendChild(li);
	}
	

	Main();
})(window);
