function calculator(id){
			result.innerHTML+=id;
			if(id=="="){
			var resultString = result.innerHTML;
			var resultArray = resultString.split("");
			if(checkOperators(resultArray[0])){
				result.innerHTML = "Invalid Argument";
			}
			else  {
			var firstNumber = parseInt(getFirstNumber(resultArray));
			var secondNumber = parseInt(getSecondNumber(resultArray));
			}
			var operator = getOperation(resultArray);
			var operation = performOperation(firstNumber,secondNumber,operator);		
			result.innerHTML+=operation;
			}
			
		
}
function getOperation(resultArray){
	for(var i=0;i<resultArray.length;i++){
		if(checkOperators(resultArray[i])){
			var operator = resultArray[i];
			break;
		}
		}
		return operator;
	
}
function getSecondNumber(resultArray){
	var secondNumber = "";
	var i=0;
	while(!checkOperators(resultArray[i])){
		i++;
	}
	i++;
	for(var j=i;j<resultArray.length;j++){
		if(checkOperators(resultArray[j])){
			continue;
		}
		else {
			secondNumber+=resultArray[j];
		}
	}
	return secondNumber;
}

function getFirstNumber(resultArray){
	var firstNumber = "";
	for(var i=0;i<resultArray.length;i++){
		if(checkOperators(resultArray[i])){
			break;
		}
		else{
			firstNumber+=resultArray[i];
		}
	}
	
	
	return firstNumber;
}

function checkOperators(index){
	var operators = ['+','-','/','*','='];
	for(var i=0;i<operators.length;i++){
			if(index== operators[i]){
				var sign = 1;
			}
		}
		
		if(sign==1)
		return true;
		else
		return false;
	}
	
function clearCalculator(){
	result.innerHTML = "";
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