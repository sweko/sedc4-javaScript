function firmFactory(title, location, employees) {
	var result = {
		title : title || "",
		location : location || "",
		employees : employees  || []
	};
	
	result.getTitle = function (){
		return result.title;
	};
	
	result.timeout = function(){
		setInterval(function() {
			console.log(result.title);
		}, 1000);
	};
	result.printMe = function(){
		return result.title + " - " + result.location + " (" + result.employees.length+")";
	};
	result.toString = result.printMe;
	result.whatever = 7; 
	
	return result;
}

var sedc2 = firmFactory("sedc","tutunski"); 