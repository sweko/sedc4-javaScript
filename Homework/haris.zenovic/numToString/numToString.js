	var num = document.getElementById('number');
	var number = num.value;
	var str = "";
	var str1 = "";
	var str2 = "";
	var str3 = "";
	var finalString = "";

	if(number < 999){
	var firstThree = number;
	var firstStr = threeNums(firstThree,str);
	finalString += firstStr;
	}
	else if(number < 999999){
	var firstThree = (number % 1000);
	var firstStr = threeNums(firstThree,str);
	var secondThree = Math.floor(number / 1000);
	var secondStr = threeNums(secondThree, str1);
	finalString += (secondStr+ " thousand " + firstStr);
	}
	else if (number < 999999999){
	var firstThree = (number % 1000);
	var firstStr = threeNums(firstThree,str);
	var secondThree = ((Math.floor(number / 1000))% 1000);
	var secondStr = threeNums(secondThree, str1);
	var thirdThree = Math.floor(number / 1000000);
	var thirdStr = threeNums(thirdThree,str2);
	finalString +=(thirdStr+" milions " + secondStr+"  thousand "+ firstStr);
	}
	else if(number < 999999999999){
	var firstThree = (number % 1000);
	var firstStr = threeNums(firstThree,str);
	var secondThree = ((Math.floor(number / 1000))% 1000);
	var secondStr = threeNums(secondThree, str1);
	var thirdThree = ((Math.floor(number / 1000000)) % 1000);
	var thirdStr = threeNums(thirdThree,str2);
	var fourthThree = Math.floor(number / 1000000000)
	var fourthStr = threeNums(fourthThree,str3);
	finalString += (fourthStr+" bilions "+thirdStr+" milions " + secondStr+"  thousand "+ firstStr);
	}
	result.value = finalString;
}
function threeNums(number,str){
	for(var k = 0; k < 3 ; k++){
		if((number % 100) < 20 & k == 0){
			str = forLessThanTwenty(number, str);
			
			number = Math.floor(number / 100);
			k +=2;
		}
		var i = number % 10;
		number = Math.floor(number/10);
		switch(k){
			case 0:
			switch(i){
				case 0:
					break;
				case 1:
					str += "one";
					break;
				case 2:
					str += "two";
					break;
				case 3:
					str += "three";
					break;
				case 4:
					str += "four";
					break;
				case 5:
					str += "five";
					break;
				case 6:
					str += "six";
					break;
				case 7:
					str += "seven";
					break;
				case 8:
					str += "eight";
					break;
				case 9:
					str += "nine";
					break;
				default:
					break;
			}
			break;
		case 1:
			switch(i){
				case 0:
					break;
				case 1:
					str = "ten "+ str;
					break;
				case 2:
					str = "twenty " + str;
					break;
				case 3:
					str = "thirty "+ str;
					break;
				case 4:
					str = "forty "+ str;
					break;
				case 5:
					str = "fifty "+ str;
					break;
				case 6:
					str = "sixty "+ str;
					break;
				case 7:
					str = "seventy "+ str;
					break;
				case 8:
					str = "eighty "+ str;
					break;
				case 9:
					str = "ninety "+ str;
					break;
				default:
					break;
			}
			
				break;
			case 2:
			switch(i){
				case 0:
					break;
				case 1:
					str= "One hundred " + str;
					break;
				case 2:
					str = "Two hundred " + str;
					break;
				case 3:
					str = "three hundred "+ str;
					break;
				case 4:
					str = "four hundred "+ str;
					break;
				case 5:
					str = "five hundred "+ str;
					break;
				case 6:
					str = "six hundred "+ str;
					break;
				case 7:
					str = "seven hundred "+ str;
					break;
				case 8:
					str = "eight hundred "+ str;
					break;
				case 9:
					str = "nine hundred "+ str;
					break;
				default:
					break;
			}
			
				break;
			default:
				break;
			}

	}
	return str;	
}

function forLessThanTwenty(number,str){
			var count = 0;
			var k = number % 100;
			switch(k){
				case 0:
					break;
				case 1:
					str+= "one";
					break;
				case 2:
					str += "two";
					break;
				case 3:
					str += "three";
					break;
				case 4:
					str += "four";
					break;
				case 5:
					str += "five";
					break;
				case 6:
					str += "six";
					break;
				case 7:
					str += "seven";
					break;
				case 8:
					str += "eight";
					break;
				case 9:
					str += "nine";
					break;
				case 10:
					str += "ten";
					break;
				case 11:
					str+= "eleven";
					break;
				case 12:
					str += "twelve";
					break;
				case 13:
					str += "thirteen";
					break;
				case 14:
					str += "fourteen";
					break;
				case 15:
					str += "fifteen";
					break;
				case 16:
					str += "sixteen";
					break;
				case 17:
					str += "seventeen";
					break;
				case 18:
					str += "eighteen";
					break;
				case 19:
					str += "nineteen";
					break;
				default:
					break;

			}
			number = Math.floor(number / 100);
		return str;
}

function gettingArray(number){
	var array = [];
	while(number != 0){
		array.push(eval(number % 10));
		number = Math.floor(number/10);
		
	}
	return array;
}
