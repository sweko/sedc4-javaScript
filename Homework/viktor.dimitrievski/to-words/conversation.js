var number = 0; //name of varible for storing number from input field
var result = document.getElementById('displayResult');
var stringArray = '';

function getValue (){
	number = document.getElementById('numberFromInput').value; //Geting value from input field and storin in varible number
	
	//console.log(number);
	//var result = document.getElementById('displayResult');
	//result.innerHTML = "Input number = " + number;
	var par = parseInt(number); //geting parsed value from input field stored in varible number
	number = par; // set number value in integer format
	//console.log(number);
	if(number <= 0)
	{
		result.innerHTML = "Invalid input";
	}
	else {
	stringArray = '';
	toWords(number);
	}
}
function toWords(number) {

	if(number <=19 ){
		toNinety(number);
	}else if(number < 100){
		
		var tenDigits = parseInt(number / 10);
		toTens(tenDigits);
		number = parseInt(number % 10);
		toNinety(number);
		
	}else if(number  < 1000){
		toHundredLoop(number);
		//var firstDigit = parseInt(number / 100);
		//toNinety(firstDigit);
		//result.innerHTML += " ";
		//result.innerHTML += "hundred ";    //this code can be optimised if you call only function toHundredLoop() because here you are doing double job
		//stringArray += " ";
		//stringArray += "hundred ";
		//number = parseInt(number % 100);
		//toTensLoop(number);
		
	}else if(number < 999999){
		
		var firstDigit = parseInt(number / 1000);
		if(firstDigit < 20){
		toNinety(firstDigit);
		}else if (firstDigit < 100){
			toTensLoop(firstDigit);
		}else{
			toHundredLoop(firstDigit);
		}
		
		//result.innerHTML += " ";
		//result.innerHTML += "thousand ";
		stringArray += " ";
		stringArray += "thousand ";
		
		number = parseInt(number % 1000);
		
		toWords(number);
		
	}else if(number < 999999999){
		
		var firstDigit = parseInt(number / 1000000);
		
		if(firstDigit < 20){
			toNinety(firstDigit);
		}else if (firstDigit < 100){
			toTensLoop(firstDigit);
		}else{
			toHundredLoop(firstDigit);
		}
		
		//result.innerHTML += " ";
		//result.innerHTML += "milion ";
		stringArray += " ";
		stringArray += "milion ";
		
		number = parseInt(number % 1000000);
		
		toWords(number);
		
	}else {
		
		var firstDigit = parseInt(number / 1000000000);
		
		if(firstDigit < 20){
			toNinety(firstDigit);
		}else if (firstDigit < 100){
			toTensLoop(firstDigit);
		}else{
			toHundredLoop(firstDigit);
		}
		
		//result.innerHTML += " ";
		//result.innerHTML += "bilion ";
		stringArray += " ";
		stringArray += "bilion ";
		number = parseInt(number % 1000000000);
		
		toWords(number);
	}
	
	
	function toTensLoop (num){ //ja secka desetkata
	
		var firstDigit = parseInt(num / 10);
		toTens(firstDigit);
		num = parseInt(num % 10);
		toNinety(num);
		
	}
	
	function toHundredLoop (num){ //tuka ja cepka stotkata
	
		var firstDigit = parseInt(num / 100)
		toNinety(firstDigit);
		//result.innerHTML += " ";
		//result.innerHTML += "hundred ";
		stringArray += " ";
		stringArray += "hundred ";
		firstDigit = parseInt(num % 100);
		
		if (firstDigit < 20){
			toNinety(firstDigit);
		}else{
		toTensLoop(firstDigit);
		}
		
	}
	
	function toNinety (num) { // array with number name from 1 to 19
		var num1to20InArray = ["",
						"one",
						"two",
						"three",
						"four",
						"five",
						"six",
						"seven",
						"eight",
						"nine",
						"ten",
						"eleven",
						"twelve",
						"thirteen",
						"fourteen",
						"fifteen",
						"sixteen",
						"seventeen",
						"eighteen",
						"nineteen",
		]
		stringArray += num1to20InArray[num];
		//for(var i= 0; i < 20; i++){
		//	if(num === i){
				//result.innerHTML += num1to20InArray[i];
				//result.innerHTML += " ";
		//		stringArray +=(num1to20InArray[i]);
		//		stringArray +=(" ");
		//	}
		//}
	}
	
	function toTens(num){//array with number name like 20-30-40....
		var numTens = ["",
				"twenty",
				"thirty",
				"forty", 
				"fifty", 
				"sixty",
				"seventy",
				"eighty", 
				"ninety"
		]
		//result.innerHTML += numTens[num-1];
		//result.innerHTML += " ";
		stringArray += numTens[num-1];
		stringArray += " ";
	}
	
	
	
	String.prototype.capitalize = function() { // prototip function which make first letter Uppercase
		
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	stringArray = stringArray.capitalize();
	result.innerHTML = stringArray;//printing on screen
	
	
	
	return stringArray; // finial result is here like string
}


