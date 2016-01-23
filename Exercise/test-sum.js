function sumArray(array){
	var result = 0;
	for (var index = 0; index < array.length; index++) {
		result += array[index];
	}
	return result;
}


function test(testFunction, testParam, expectedValue){
	var result = testFunction(testParam);
	if (result == expectedValue){
		console.log("Got expected result of " + expectedValue);
		return true;
	}
	else {
		console.log("Expected " + expectedValue + ", got "+ result);
		return false;
	}
}


test(sumArray, [1,2,3,4], 10);

test(sumArray, [1,1,1,1], 4);

test(sumArray, [4,3,2,1], 10);
test(sumArray, [], 0);
test(sumArray, null, 0);
test(sumArray, "string", 0);