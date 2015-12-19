function Firm(title, location, employees) {
	this.title = title || "";
	this.location = location || "";
	this.employees = employees  || [];
	
	var self = this; 
	console.log("fsdaf");
	
	this.getTitle = function (){
		return self.title;
	};
	
	this.timeout = function(){
		setInterval(function() {
			console.log(self.title);
		}, 1000);
	};
	
	//this.timeout();
}

window.title = "Window Title";

Firm.prototype.printMe = function(){
		return this.title + " - " + this.location + " (" + this.employees.length+")";
};
	
Firm.prototype.toString = Firm.prototype.printMe;

Firm.prototype.whatever = 7; 

var allFirms = {};

function printFirms(){
	var result = document.getElementById("result");
	result.innerHTML = "";
	for (var key in allFirms) {
		var element = allFirms[key];
		result.innerHTML +="<h2>"+element+"</h2>";
		for (var index = 0; index < element.length; index++) {
			var firm = element[index];
			result.innerHTML +="<p>"+firm+"</p>";
		}
	}
}