var number = 0;


	function count3DigitBlocks(number) {   //It counts the number of three digit blocks in a number (the final block may be less than 3 digits).
	    var count = 0;
	    if (number < 1000) {
	    	count = 1;
	    } else {
			while(number !== 0) {
				var remainder = number % 1000;
				number = parseInt(number / 1000);
				count = count +1;
				}
		}
		return count;

	}


	function toWords3DigitNumber (remainder) {    //Converts 3 digit integers to their written form. 


			var remainder1 = remainder % 100;
			var threeDigitNum = (remainder - remainder1) / 100;

			if (remainder1 > 19 && remainder1 % 10 !== 0) {
			     var remainder2 = remainder1 % 10;
			     var twoDigitNum = remainder1 - remainder2; 
			     var toWords3DigitNumber = toWordsUniqueNumbers(threeDigitNum) + " hundred " + toWordsUniqueNumbers(twoDigitNum) + " " + toWordsUniqueNumbers(remainder2);
			} else if (remainder1 > 19 && remainder1 % 10 === 0){
			 	var toWords3DigitNumber = toWordsUniqueNumbers(threeDigitNum) + " hundred " + toWordsUniqueNumbers(remainder1);
			} else if (remainder1 > 0 && remainder1<=19) {
				var twoDigitNum = remainder1;
				var toWords3DigitNumber = toWordsUniqueNumbers(threeDigitNum) + " hundred " + toWordsUniqueNumbers(twoDigitNum);
			} else {
				var toWords3DigitNumber = toWordsUniqueNumbers(threeDigitNum)+" hundred";
			} 

		return toWords3DigitNumber;
	}



	function toWords2DigitNumber (remainder) {    //Converts 2 digit integers to their written form. 

			var remainder1 = remainder % 10;
			var twoDigitNum = remainder - remainder1;

			if (remainder > 19 && remainder % 10 !== 0) {
			     var toWords2DigitNumber = toWordsUniqueNumbers(twoDigitNum) + " " + toWordsUniqueNumbers(remainder1);
			} else{
			 	var toWords2DigitNumber = toWordsUniqueNumbers(remainder);

			 }
		return toWords2DigitNumber;
	}




	function toWordsUniqueNumbers (number) { //Returns words for *unique numbers up to 100. 
		switch(number) {                     //*(numbers that can't be written as a combination of other numbers)
			case 0:
				return "zero";
				break;
			case 1:
				return "one";
				break;
			case 2:
				return "two";
				break;
			case 3:
				return "three";
				break;
			case 4:
				return "four";
				break;
			case 5:
				return "five";
				break;
			case 6:
				return "six";
				break;
			case 7:
				return "seven";
				break;
			case 8:
				return "eight";
				break;
			case 9:
				return "nine";
				break;
			case 10:
				return "ten";
				break;
			case 11:
				return "eleven";
				break;
			case 12:
				return "twelve";
				break;
			case 13:
				return "thirteen";
				break;
			case 14:
				return "fourteen";
				break;
			case 15:
				return "fifteen";
				break;
			case 16:
				return "sixteen";
				break;
			case 17:
				return "seventeen";
				break;
			case 18:
				return "eighteen";
				break;
			case 19:
				return "nineteen";
				break;
			case 20:
				return "twenty";
				break;
			case 30:
				return "thirty";
				break;
			case 40:
				return "forty";
				break;
			case 50:
				return "fifty";
				break;
			case 60:
				return "sixty";
				break;
			case 70:
				return "seventy";
				break;
			case 80:
				return "eighty";
				break;
			case 90:
				return "ninety";
				break;
			case 100:
				return "hundred";
				break;
			default:
				break;
		}

	}

function toWords(number){//Main function that transforms numbers into words

	var result = "";
	var remainder = 0;
	var numArray=[];
	var wordArray=[];
	var numberInWords = [];

	if (isNaN(number)) {  //Checks if entered value is a positive number
		result = "Please enter a number.";
		return result;
	} else if (number < 0) {
		result = "Please enter a positive number.";
		return result;
	} else {
		number = parseInt(number);
	}

	
	var number3DigitBlocks = count3DigitBlocks(number);


	for (var i=1; i<=number3DigitBlocks; i++) { //Separates number in 3 digit blocks and pushes them to 
		remainder = number % 1000;			   //an array (the final block may be less than 3 digits)
		number = (number - remainder) /1000;
		numArray.push(remainder);
	} 	



	for (var i= 0; i < number3DigitBlocks; i++){  //Takes array from loop above and transforms 3 digit elements into words
	       if (numArray[i] === 0 && numArray.length === 1) {
	       		wordArray.push("zero");
	       } else if (numArray[i] === 000) {
	       		wordArray.push("");
	       } else if (numArray[i] > 99) {
	       		wordArray.push(toWords3DigitNumber(numArray[i], toWordsUniqueNumbers));
	       } else if (numArray[i] > 9 && numArray[i]< 100) {
	       		wordArray.push(toWords2DigitNumber(numArray[i], toWordsUniqueNumbers));
	       } else {
	       		wordArray.push(toWordsUniqueNumbers(numArray[i]));
	       }
	}


		
	for (var i = (number3DigitBlocks -1); i >= 0; i-- ) { //Takes elements from previous array and adds qualifiers like thousand, million and billion.
			if (i > 3) {
				numberInWords.push("Please enter a number of no more than 12 digits.");
				break;
			} else {
				if (wordArray[i] === "") {  //This prevents the qualifiers to be added if the three digit block is 000
				numberInWords.push(""); 
				} else {
					switch(i) {
							case 3:
							numberInWords.push(wordArray[3] + " billion");
							break;
							case 2:
							numberInWords.push(wordArray[2] + " million");
							break;
							case 1:
							numberInWords.push(wordArray[1] + " thousand");
							break;
							case 0:
							numberInWords.push(wordArray[0]);
							break;
							default:
							break;
						}

					}
				}
	}


        numberInWords[0] = numberInWords[0].charAt(0).toUpperCase()+ numberInWords[0].substr(1);

		var result = numberInWords.join(" ");
		return result;

}
		toWords(number);