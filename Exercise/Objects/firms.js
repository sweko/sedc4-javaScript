function Firm(title, location) {
	this.title = title;
	this.location = location;
}

var allFirms = {};


function printFirms(){
	var result = document.getElementById("result");
	result.innerHTML = "";
	for (var key in allFirms) {
		var element = allFirms[key];
		result.innerHTML +="<h2>"+key+"</h2>";
		for (var index = 0; index < element.length; index++) {
			var firm = element[index];
			result.innerHTML +="<p>"+firm.title+"</p>";
		}
	}
}