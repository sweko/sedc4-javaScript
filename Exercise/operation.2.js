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


var firstNumber = enterNumber("Enter first number");
var secondNumber = enterNumber("Enter second number");
var operation = prompt("enter + - * /");
var result = performOperation(secondNumber, firstNumber, operation);


document.writeln("first number = "+firstNumber+"<br/>");
document.writeln("second number = "+secondNumber+"<br/>");
document.writeln("operation = "+operation+"<br/>");
document.writeln("result = "+result+"<br/>");