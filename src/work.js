(function(window) {
var index = 1;
var handlers={};
	function Main() {
		if(window.templateLoadComplete==true)
		{
			onDataLoaded();
		}else{
			Event.addListener(window,"TEMPLATE_DATA_LOADED",onDataLoaded);			
		}
		
		
		

	}
	function onDataLoaded()
	{
		for (var a = 0; a < window.data["index.html"].length; a++) {
			var item = window.data["index.html"][a];
			if (item.id == "workThumb" + index) {
				createWorkThumb(item,index);
				index++;
			}
		}
	}
	function createWorkThumb(item,index) {
		var li = document.createElement("li");
		li.id="work-"+index;
		li.setAttribute("index",index);
		var div = document.createElement("div");
		div.setAttribute("index",index);
		div.id ="title-"+index;
		div.className="title";
		div.innerHTML = "<p>"+getTitle(index)+"</p>";
		
		
		
		handlers["workOut"+index]=function(event)
		{
				onOutWork(li,index);
		}
		handlers["workOver"+index]=function(event)
		{
				onOverWork(li,index);
		}
		handlers["workClick"+index]=function(event)
		{
				onWorkClick(li,index);
		}
		Utensil.addListener(li,"mouseover",handlers["workOver"+index]);
		Utensil.addListener(li,"mouseout",handlers["workOut"+index]);
		Utensil.addListener(li,"click",handlers["workClick"+index]);
		
		var img = new Image();
		img.id="thumb-"+index;
		img.src= "admin/resource/image/"+item.value;
		img.setAttribute("index",index);
		li.appendChild(img);
		li.appendChild(div);
		document.getElementById("work").appendChild(li);
	}
	function onOverWork(target,index)
	{
		
		document.getElementById("title-"+index).style.bottom="0";
	}
	function onOutWork(target,index)
	{
		if(!target.id ||target.id && target.id!="title-"+index )
		document.getElementById("title-"+index).style.bottom="100%";
	}
	function onWorkClick(target,index)
	{
		if(!target.id ||target.id && target.id!="title-"+index )
		window.location ="work.html?index="+index;
	}

	function getTitle(index)
	{
		for (var a = 0; a < window.data["index.html"].length; a++) {
			var item = window.data["index.html"][a];
			if (item.id == "workTitle" + index) {
				return item.value;
			
			}
		}
		return "";
	}

	Main();
})(window);
