//alert("Bla");
// -----------------------------------------
// |	  Numbers in Words       |
// |           up to 10^200           |
// ------------------------------------------

var numbersZeroToTwenty = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];
var mainNumbers = ["", "ten ", "twenty ", "thirty ", "fourty ", "fifty ", "sixty ", "seventy ", "eighty ", "ninety "];
var hugeNumbers = ["", "thousand ", "million ", "billion ", "trillion ", "quadrillion ", "quintillion ", "sextillion ", "septillion ", "octillion ", "nonillion ", "decillion ", "undecillion ", "duodecillion ", "tredecillion ", "quattuordecillion ", "quindecillion ", "sexdecillion ", "septendecillion ", "octadecillion ", "novemdecillion ", "vigintillion ", "unvigintillion ", "duovigintillion ", "trevigintillion ", "quattuorvigintillion ", "quinvigintillion ", "sexvigintillion ", "septenvigintillion ", "octavigintillion ", "novemvigintillion ", "trigintillion ", "untrigintillion ", "duotrigintillion ", "tretrigintillion ", "quattuortrigintillion ", "quintrigintillion ", "sextrigintillion ", "septentrigintillion ", "octatrigintillion ", "novemtrigintillion ", "quadragintillion ", "unquadragintillion ", "duoquadragintillion ", "trequadragintillion ", "quattuorquadragintillion ", "quinquadragintillion ", "sexquadragintillion ", "septenquadragintillion ", "octaquadragintillion ", "novemquadragintillion ", "quinquagintillion ", "unquinquagintillion ", "duoquinquagintillion ", "trequinquagintillion ", "quattuorquinquagintillion ", "quinquinquagintillion ", "sexquinquagintillion ", "septenquinquagintillion ", "octaquinquagintillion ", "novemquinquagintillion ", "sexagintillion ", "unsexagintillion ", "duosexagintillion ", "tresexagintillion ", "quattuorsexagintillion ", "quinsexagintillion "];
var numberInWordsArray = "";
var counter = 0;
var number = parseInt(prompt("Enter a number: "));
toWords(number);

function toHundreds(y){
	if(y === 0)
		return "";
	else
	if(y>=100)
		return numbersZeroToTwenty[Math.floor(Math.floor(y/100))]+"hundred "+mainNumbers[Math.floor(Math.floor(y%100)/10)]+""+numbersZeroToTwenty[y%10];
	else	
		return mainNumbers[Math.floor(Math.floor(y%100)/10)]+numbersZeroToTwenty[y%10];
}

function toWords( x ){
	 if(x === 0){
		console.log("Zero");
	}else {
		
		if(x < 0){
			numberInWordsArray += "Minus ";
			x *=-1;
		}
		
		if(x>0 && x<20){
			numberInWordsArray += numbersZeroToTwenty[x];
		}else{ 
			while(x !== 0){
				var houndred = x%1000;
				x = Math.floor(x/1000);
				if(houndred !==0 ) 
					numberInWordsArray =toHundreds(houndred) + hugeNumbers[counter] + numberInWordsArray;
				else
					numberInWordsArray = toHundreds(houndred) + numberInWordsArray;
				
				counter++;
			}
		}
		return numberInWordsArray;
		console.log(numberInWordsArray);
	}
	
} 