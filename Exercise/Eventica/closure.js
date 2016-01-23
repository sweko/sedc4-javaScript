var array = [{id:1},{id:2},{id:3}];

(function(){
	for (var index = 0; index < array.length; index++) {
		var element = array[index];
		console.log(element);
	}
	console.log("Finished immediate");
})();

var functions = [];
for (var index = 0; index < array.length; index++) {
	var element = array[index];
	functions.push((function(element){
		return function(){
			console.log(element);
		};
	})(element));
}

for (var index = 0; index < functions.length; index++) {
	var f = functions[index];
	f();
}