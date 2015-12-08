// functions as variables
var someName = function (x, y){
	return x+y;
};

var someOtherName = someName;

// console.log(someName(4, 5));
// console.log(someOtherName(10, 5));

//functions as parameters
function callTwice(someFunction, param1, param2){
	someFunction(param1);
	someFunction(param2);
}

function square(x){
	var result =x*x;
	return result; 
}

function callTimes(someFunction, times){
	for (var index = 0; index < times; index++) {
		someFunction();
	}
}

// callTwice(square, 3, 6);
// callTwice(function(x){document.writeln(x + "<br />");}, "Hello", "World");

// functions as return values;
function writeResult(value){
	document.writeln(value + "<br />");
}

function double(x){return 2*x;}
function triple(x){return 3*x;}

// writeResult(square(10));
// writeResult(double(10));
// writeResult(triple(10));

function generateValues(operation){
	for (var index = 0; index < 10; index++) {
		operation(index);
	}
}

function combine(first, second){
	return function(x){
		return second(first(x));
	};
}

//generateValues(combine(combine(square, double), writeResult));

//writeResult(combine(square, double)(10))

function add(x, y) {
	return x + y;
}

function addz(z){
	return function (x){
		return add(x, z);
	}
}

var array = [1, 2, 3, 4, 5, 10, 11, 12, 6, 7, 8, 9];

function addNumberToArray(array, number){
	var addNumber = addz(number);
	var result = [];
	for (var index = 0; index < array.length; index++) {
		var element = array[index];
		result.push(addNumber(element));
	}
	return result;
}

// var result = addNumberToArray(array, 7);
// writeResult(result);

//map, filter, sort
writeResult("MAP");
var result = array.map(function (x) {return x * x;});
writeResult(result);

writeResult("FILTER");
result = array.filter(function (x){return x % 2 === 1;});
writeResult(result);

writeResult("FILTER & MAP");
result = array
	.filter(function (x){return x % 2 === 1;})
	.map(function (x) {return x * x;});
writeResult(result);

writeResult("SORT");
array.sort(function(a, b){
	if (a===b)
		return 0;
	var a2 = a % 2;
	var b2 = b % 2;
	
	if (a2 !== b2)
		return b2-a2;
	
	if (a2 === 0) {
		return b-a;
	} else {
		return a-b;	
	}
});
writeResult(array);

//IIFE

(function (){
	var x = 3;
	var y = 7;
	var z = 4;
	console.log(x+y*z);
})();


