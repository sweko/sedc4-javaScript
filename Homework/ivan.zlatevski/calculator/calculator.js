(function(){
	
var calcButton = document.getElementsByClassName("calcButton");
var display = document.getElementById("display");
var displayNumber = "";
var displayArray=[];
var inputNumber = "";
var inputArray = [];
for(var i=0;i<calcButton.length;i++){ // eventi za buttons
	var index = calcButton[i];
	index.onclick = function(){
		display.innerHTML += this.innerHTML;
		if(!checkOperators(this.innerHTML) && this.innerHTML!=="C"){
			displayNumber +=this.innerHTML;
			
		}
		else if(checkOperators(this.innerHTML)){
				if(this.innerHTML!=="="){
				displayArray.push(parseInt(displayNumber));
				var operator = this.innerHTML;
				displayArray.push(operator);
				displayNumber = "";
				}
				else{
				var numTemp = parseInt(displayNumber);
					displayArray.push(numTemp);
					var result = processArray(displayArray);
					displayNumber = result;
					displayArray =[];
					display.innerHTML+=result;
			}
				
			}
				
		
		else if(this.innerHTML ==="C"){
				display.innerHTML = "";
				displayArray= [];
				displayNumber = "";
			}
		}
};
		
	

document.onkeydown = function(event){ // event za tastatura
		display.innerHTML += keyConversion(event.which);
			var keyValue = keyConversion(event.which);
				if(!checkOperators(keyValue) && keyValue !== "Esc"){
					inputNumber+=keyValue;
				}
					else if(checkOperators(keyValue)) {
						if(keyValue!=="="){
						inputArray.push(parseInt(inputNumber));
						var operator = keyValue;
						inputArray.push(operator);
						inputNumber="";
						}
					else{
						inputArray.push(parseInt(inputNumber));
						var result = processArray(inputArray);
						inputNumber = result;
						inputArray = [];
						display.innerHTML += result;
					}
					}		
					else if(keyValue === "Esc"){
						display.innerHTML = "";
						inputArray = [];
						inputNumber = "";
					}
};

function processArray(displayArray){ // prai presmetki so toa sto im dava prednost na operatorite
		for(var i=0;i<displayArray.length;i++){
				if(displayArray[i]==="*" || displayArray[i]==="/"){
					var result = performOperation(displayArray[i-1],displayArray[i+1],displayArray[i]);
					displayArray.splice(i-1,3,result);
					i=0;
				}
		}
				i=0;
					while(displayArray.length!==1){
						if(displayArray[i]==="+" || displayArray[i]==="-"){
							var result = performOperation(displayArray[i-1],displayArray[i+1],displayArray[i]);
							displayArray.splice(i-1,3,result);
							i=0;
						}
						i++;
					}
		
		return displayArray[0];
	}


function keyConversion(keyCode){ // konverzija na keycode
	var keyPressed;
	switch(keyCode){
		case 48:
		case 96:
			keyPressed = "0";
			break;
		case 49:
		case 97:
			keyPressed = "1";
			break;
		case 50:
		case 98:
			keyPressed = "2";
			break;
		case 51:
		case 99:
			keyPressed = "3";
			break;
		case 52:
		case 100:
			keyPressed = "4";
			break;
		case 53:
		case 101:
			keyPressed = "5";
			break;
		case 54:
		case 102:
			keyPressed = "6";
			break;
		case 55:
		case 103:
			keyPressed = "7";
			break;
		case 56:
		case 104:
			keyPressed = "8";
			break;
		case 57:
		case 105:
			keyPressed = "9";
			break;
		case 106:
			keyPressed = "*";
			break;
		case 107:
			keyPressed = "+";
			break;
		case 109:
			keyPressed = "-";
			break;
		case 111:
			keyPressed = "/";
			break;
		case 13:
			keyPressed = "=";
			break;
		case 27:
			keyPressed = "Esc";
			break;
		default:
			alert("Invalid input");
			break;
		}
		return keyPressed;
}
	
function performOperation(firstNumber, secondNumber, operation){
	var result;
	switch (operation) {
		case "+":
		
			result = firstNumber + secondNumber;
			break;
		case "-":
		
			result = firstNumber - secondNumber;
			break;
		case "*":
			
			result = firstNumber * secondNumber;
			break;
		case "/":
		
			result = Math.floor(firstNumber / secondNumber);
			break;
		default:
			result = "Invalid operation";
			break;
	}
	return result;
}



function checkOperators(index){
	var operators = ['/','*','+','-','='];
		for(var i=0;i<operators.length;i++){
			if(index== operators[i]){
				var sign = 1;
			}
		}
		
			var result = (sign ===1);
			return result;
}

})();

