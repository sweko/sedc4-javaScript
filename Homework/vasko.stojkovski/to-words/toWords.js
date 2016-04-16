

function toWords (number) {

	var oneToNine=["","one","two","three","four","five","six","seven","eight","nine"];
	var elevenToNineteen=["","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
	var tenToNinety=["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
	var hundreds=["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"];

		
		if (number===0) 
			return "Zero";
	
		var firstNumber=number%1000;
		number=parseInt(number/1000);
		
		var secondNumber=number%1000;
		number =parseInt(number/1000);

		var thirdNumber=number%1000;
		number=parseInt(number/1000);

		var fourthNumber=number%1000;
		number=parseInt(number/1000);

		var firstString=numberToWords(firstNumber);
		var secondString=numberToWords(secondNumber);
		var thirdString=numberToWords(thirdNumber);
		var fourthString=numberToWords(fourthNumber);

		var numberToWords = "";
			if (fourthString !="") {
				
				fourthString =fourthString + " billion";
				numberToWords=numberToWords+fourthString;
			}

			if (thirdString !="") {

				thirdString=thirdString+" million";
				numberToWords=numberToWords+" "+thirdString;
			}
			
			if (secondString !="") {
				secondString=secondString+" thousand";
				numberToWords=numberToWords+" "+secondString;
			}

			if (firstString !="")
				numberToWords=numberToWords+" "+firstString;

			numberToWords=numberToWords.trim();
			numberToWords=numberToWords.charAt(0).toUpperCase() + numberToWords.slice(1);

		function numberToWords(number){

				var string=""; 
				var counter=1;
				var previousDigit;
				var previousString;
				 	
				while(number!=0)
				{
					var cifra=number%10;
					number=parseInt(number/10);
						
					switch(counter)
					{
						// ex: 5
						case 1:
						{
							previousString=string;
							previousDigit=cifra;
							if(cifra!=0)
								string=oneToNine[cifra]+" "+string;
							break;
						}
						// ex: 25 or 11
						case 2:
						{
							if(cifra==1 && previousDigit!=0)
								string=elevenToNineteen[previousDigit];
							else if(cifra!=0)
								string=tenToNinety[cifra]+" "+string;

							break;
						}
						// ex: 225
						case 3:
						{	
							if(cifra!=0)
								string=hundreds[cifra]+" "+string;
							break;
						}
						
					}

					counter++;
					
				}

				return string.trim();
			}
			
			return (numberToWords);
			

		result=(numberToWords);

return result;

}