var printAlert = function(){
	alert("Hello from alert");
};

var printConsole = function(){
	console.log("Hello from console");
};

var printDiv = function(){
	var result = document.getElementById("result");
	result.innerHTML = "Hello from div";
};

var doResult = document.getElementById("doResult");
doResult.addEventListener("change", function(){
	if (checked){
		button.addEventListener("click", printDiv)
	} else {
		button.removeEventListener("click", printDiv)
	}
})