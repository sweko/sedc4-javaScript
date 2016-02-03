var handler = function(event){
	var result = document.getElementById("result");
	result.innerHTML += "{x:"+event.x+", y:"+event.y+ "}";
};

document.addEventListener('DOMContentLoaded', function(){
	var area = document.getElementById("area");

	var button = document.getElementById("toggle");
	var state = "adding";
	button.addEventListener("click", function(){
		if (state === "adding"){
			area.addEventListener("click", handler);
			button.innerHTML = "Remove";
			state = "removing";
		} else {
			area.removeEventListener("click", handler);
			button.innerHTML = "Add";
			state = "adding";
		}
	});
});