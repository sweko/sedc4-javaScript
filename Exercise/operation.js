do {
	var firstNumber = Number(prompt("enter first number"));
} while (isNaN(firstNumber))

do {
	var secondNumber = Number(prompt("enter second number"));
} while (isNaN(secondNumber))

var operation = prompt("enter + - * /");

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

document.writeln("first number = "+firstNumber+"<br/>");
document.writeln("second number = "+secondNumber+"<br/>");
document.writeln("operation = "+operation+"<br/>");
document.writeln("result = "+result+"<br/>");