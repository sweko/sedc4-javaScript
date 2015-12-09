
			var arrayPrvDigit=["","one","two","three","four","five","six","seven","eight","nine"];
			var arraySpecial=["","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
			var arrayVtorDigit=["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
			var arrayTretDigit=["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"];
		
			
			
		 
		 
		function toWords(number)
		{
				if(number==0)
					return "Zero";
			var num1 = number%1000;
			number=parseInt(number/1000);

			var num2 = number%1000;
			number=parseInt(number/1000);

			var num3 = number%1000;
			number=parseInt(number/1000);

			var num4 = number%1000;
			number=parseInt(number/1000);

			var string1=numToString(num1);
			var string2=numToString(num2);
			var string3=numToString(num3);
			var string4=numToString(num4);
			
			var numToWords="";
			if(string4!="")
			{
				string4+=" billion";
				numToWords+=string4;
			}

			if(string3!="")
			{
				string3+=" million";
				numToWords+=" "+string3;
			}
			if(string2!="")
			{
				string2+=" thousand";
				numToWords+=" "+string2;
			}
			if(string1!="")
				numToWords+=" "+string1;

			numToWords=numToWords.trim();
			numToWords=numToWords.charAt(0).toUpperCase() + numToWords.slice(1);
			console.log(numToWords);

			function numToString(num)
			{ 
				var string=""; //here we will have word from 3 digits
				var counter=1;
				var previousDigit;
				var previousString;
				 	
				while(num!=0)
				{
					var cifra=num%10;
					num=parseInt(num/10);
						
					switch(counter)
					{
						// ex: 5
						case 1:
						{
							previousString=string;
							previousDigit=cifra;
							if(cifra!=0)
								string=arrayPrvDigit[cifra]+" "+string;
							break;
						}
						// ex: 25 or 11
						case 2:
						{
							if(cifra==1 && previousDigit!=0)
								string=arraySpecial[previousDigit];
							else if(cifra!=0)
								string=arrayVtorDigit[cifra]+" "+string;

							break;
						}
						// ex: 225
						case 3:
						{	
							if(cifra!=0)
								string=arrayTretDigit[cifra]+" "+string;
							break;
						}
						
					}

					counter++;
					
				}

				return string.trim();
			}
			
			return (numToWords);
			
			


		}

		function btnPress()
		{
			var num=parseInt(document.getElementById("input").value)
			
			if(isNaN(num) || num<0 || num>999999999999)
			{
				document.getElementById("answer").innerHTML="WRONG INPUT";
				document.getElementById("answerMac").innerHTML="Gresen INPUT";
			}
			else
			{
				document.getElementById("answer").innerHTML=toWords(num);
				document.getElementById("answerMac").innerHTML=toWordsMac(num);
			//console.log(br);
				
			}
				
		
		}

