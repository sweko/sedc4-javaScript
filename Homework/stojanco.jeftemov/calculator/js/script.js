(function () {
	var keys = document.querySelectorAll("#calculator button");
	var OPERATORS = ['*','/','+','-'];//OPERATORS in the order in which they should be evaluated
	var display = document.getElementById("display");
	for (var index = 0; index < keys.length; index++) {		
		var element = keys[index];
		element.onclick = function() {			
			display.textContent = processInput(this.textContent, display.textContent, OPERATORS);
		};
	}
	document.addEventListener("keydown", function(event) {
		var keyCode = event.keyCode;
		var keyValue = fromKeyCode(keyCode);
		if (keyValue) {
			display.textContent = processInput(keyValue, display.textContent, OPERATORS);	
		}
	});
	
	function isContained(inputChar, inputArray) {
		return inputArray.indexOf(inputChar) > -1;
	}
	
	function calculateResult(expression, OPERATORS) {
		var result = 0;
		var equation = expression;
		var lastChar = equation[equation.length - 1];
		if (isContained(lastChar, OPERATORS)) {
			equation = equation.substring(0,equation.length - 1);
		}
		if (equation) {
			result = parseInt(parseAndCalculate(equation, OPERATORS));
		}
		return result;
		
		function parseAndCalculate(expression, OPERATORS) {
			var funcs = [multiply, divide, add, subtract];                 // the functions associated with the OPERATORS
			var tokens = expression.split(/\b/);      // split the string into "tokens" (numbers or OPERATORS)
			for (var round = 0; round < OPERATORS.length; round++) {          // do this for every sign
				console.log("tokens at this point: " + tokens.join(" "));
				for (var place = 0; place < tokens.length; place++) {    // do this for every token
					if (tokens[place] == OPERATORS[round]) {                         // a sign is found
						var a = parseInt(tokens[place - 1]);    // convert previous token to number
						var b = parseInt(tokens[place + 1]);        // convert next token to number
						var result = funcs[round](a, b);           // call the appropriate function
						console.log("calculating: " + a + OPERATORS[round] + b + "=" + result);
						tokens[place - 1] = result.toString();      // store the result as a string
						tokens.splice(place, 2);	// delete obsolete tokens
						place--;	//and back up one place
					}
				}
			}
			return tokens[0];                  // at the end tokens[] has only one item: the result
		
			function multiply(x, y) {                   // the functions which actually do the math
				return x * y;
			}
		
			function divide(x, y) {                        // the functions which actually do the math
				return x / y;
			}
			
			function add(x, y) {                   // the functions which actually do the math
				return x + y;
			}
		
			function subtract(x, y) {                        // the functions which actually do the math
				return x - y;
			}
		}
	}
	
function processInput(input, output, OPERATORS) {
		var lastChar = output[output.length - 1];
		if (input === 'C') {
			output = '0';
		} 
		else if (input === '=') {
			output = calculateResult(output, OPERATORS).toString();
		}
		else if (OPERATORS.indexOf(input) > -1) {
			output = processOperator(input, output, OPERATORS);
		}
		else if (output == '0') {
				output = input;
		} 
		else if ((output == '-') && (input == '0')) {
			output = input;
		}
		else if (!((lastChar == '/') && (input == '0'))) {
			output += input;
		}
		return output;
		
		function processOperator(input, output, OPERATORS) {
			var lastChar = output[output.length - 1];
			if (output != '0' && !isContained(lastChar, OPERATORS)) {
				output += input;
			}
			else if (isContained(lastChar, OPERATORS) && output.length > 1) {
				output = output.replace(/.$/,input);
			}
			return output;		
		}
	}


	function fromKeyCode(keyCode) {
		var result = '';
		if ((keyCode >= 96) && (keyCode <= 105))  {
			keyCode -= 48;
		}
		if ((keyCode >= 48) && (keyCode <= 57)) {
			result = String.fromCharCode(keyCode);
		} else {
			switch (keyCode) {
				case 13:
				case 187:
					result = '=';
					break;
				case 27:
					result = 'C';
					break;
				case 111:
				case 191:
					result = '/';
					break;
				case 106:
					result = '*';
					break;
				case 107:
					result = '+';
					break;
				case 109:
				case 189:
					result = '-';
					break;
			}
		}
		return result;
	}

})();
