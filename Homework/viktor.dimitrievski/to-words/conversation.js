var number = 0; //name of varible for storing number from input field
var result = document.getElementById('displayResult');
var stingArray = '';

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
	toWords(number);
	}
}
function toWords(number) {

	if(number <=19 ){
		
		return toNinety(number);
		
	}else if(number < 100){
		var tenDigits = parseInt(number / 10);
		toTens(tenDigits);
		number = parseInt(number % 10);
		toNinety(number);
	}else if(number  < 1000){
		var firstDigit = parseInt(number / 100);
		toNinety(firstDigit);
		//result.innerHTML += " ";
		//result.innerHTML += "hundred ";
		stingArray += " ";
		stingArray += "hundred ";
		number = parseInt(number % 100);
		toTensLoop(number);
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
		stingArray += " ";
		stingArray += "thousand ";
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
			//con0
		}
		//result.innerHTML += " ";
		//result.innerHTML += "milion ";
		stingArray += " ";
		stingArray += "milion ";
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
		stingArray += " ";
		stingArray += "bilion ";
		number = parseInt(number % 1000000000);
		toWords(number);
	}
	
	
	function toTensLoop (num){
		var firstDigit = parseInt(num / 10);
		toTens(firstDigit);
		num = parseInt(num % 10);
		toNinety(num);
		
	}
	
	function toHundredLoop (num){
		var firstDigit = parseInt(num / 100)
		toNinety(firstDigit);
		//result.innerHTML += " ";
		//result.innerHTML += "hundred ";
		stingArray += " ";
		stingArray += "hundred ";
		firstDigit = parseInt(num % 100);
		if (firstDigit < 20){
			toNinety(firstDigit);
		}else{
		toTensLoop(firstDigit);
		}
	}
	function toNinety (num) {
		var num1to20InArray = ["zero",
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
		for(var i= 0; i < 20; i++){
			if(num === i){
				//result.innerHTML += num1to20InArray[i];
				//result.innerHTML += " ";
				stingArray +=(num1to20InArray[i]);
				stingArray +=(" ");
			}
		}
	}
	
	function toTens(num){
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
		stingArray +=(numTens[num-1]);
		stingArray +=(" ");
	}
	
	
	
	String.prototype.capitalize = function() {
		
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	stingArray = stingArray.capitalize();
	
	result.innerHTML = stingArray;
	return stingArray;
	
}


