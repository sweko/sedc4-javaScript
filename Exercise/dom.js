// init();
// 
// function init(){
// 	var element = document.getElementById("content");
// 	element.innerHTML = "Hello from JavaScript";
// }


function performCalculation(){
	var firstNumber = getNumberFromElement("firstNumber");
	var secondNumber = getNumberFromElement("secondNumber");
 	var operation = getValueFromSelect("operation");
 	var result = performOperation(firstNumber, secondNumber, operation);
	 
	 var resultContainer = document.getElementById("result");
	 resultContainer.innerHTML = "The result of the '"+ operation + "' operation between "
	   + "<b>"+firstNumber+"</b>" 
	   + " and <b>"+secondNumber+"</b>" 
	   + " is <i>"+result+"</i>";
// 	document.writeln("first number = "+firstNumber+"<br/>");
// 	document.writeln("second number = "+secondNumber+"<br/>");
// 	document.writeln("operation = "+operation+"<br/>");
// 	document.writeln("result = "+result+"<br/>");
}

function getNumberFromElement(id){
	var element = document.getElementById(id);
	var value = element.value.trim();
	var result = Number(value);
	return result;
}

function getValueFromSelect(id){
	var element = document.getElementById(id);
	var value = element.value;
	return value;
}


function performOperation(firstNumber, secondNumber, operation){
	var result;
	switch (operation) {
		case "+":
		case "add":
			result = firstNumber + secondNumber;
			break;
		case "-":
		case "sub":
			result = firstNumber - secondNumber;
			break;
		case "*":
		case "mul":
			result = firstNumber * secondNumber;
			break;
		case "/":
		case "div":
			result = firstNumber / secondNumber;
			break;
		default:
			result = "Invalid operation";
			break;
	}
	return result;
}


