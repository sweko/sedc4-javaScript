function enterNumber(message){
	do {
		var temp = prompt(message);
		console.log("The user entered "+temp);
		if (temp.trim() === ""){ 
			continue;
		}
		var result = Number(temp);
	} while (isNaN(result));
	return result;
}

function enterArray(length){
	var result = [];
	for (var index = 0; index < length; index++) {
		var number = enterNumber("Enter element #"+index);
		result.push(number);
	}
	return result;
}

function sumArray(array){
	var result = 0;
	for (var index = 0; index < array.length; index++) {
		result += array[index];
	}
	return result;
}

function asString(array){
	// var result ="";
	// for (var index = 0; index < array.length; index++) {
	// 	result += array[index] + ", ";
	// }
	
	var result = "["+array.join(", ")+"]";
	return result;
}


var count = enterNumber("enter count");
var numbers = enterArray(count);
var sum = sumArray(numbers);
var strArray = asString(numbers);

document.writeln("Sum of the array "+strArray + " is "+ sum);