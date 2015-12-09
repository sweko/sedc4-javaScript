	var arrayPrvDigitMac=["","еден","два","три","четири","пет","шест","седум","осум","девет"];
			var arraySpecialMac=["","единаесет","дванаесет","тринаесет","четиринаесет","петнаесет","шеснаесет","седумнаесет","осумнаесет","деветнаесет"];
			var arrayVtorDigitMac=["","десет","дваесет","триесет","четериесет","педесет","шеесет","седумдесет","осумдесет","девеесет"];
			var arrayTretDigitMac=["","сто","двесте","триста","четиристотини","петстотини","шестотини","седумстотини","осумстотини","девестотини"];


			function toWordsMac(number)
		{
				if(number==0)
					return "Нула";
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
				var niza=string4.split(" ");
				var dolzina=niza.length;
				if(niza[dolzina-1]=="еден")
				{
					if(dolzina>1)
						niza[dolzina-1]="и една"
					else
						niza[dolzina-1]="една"
					string4=niza.join(' ');
					string4+=" милијарда";
				}
				else if(niza[dolzina-1]=="два")
				{
					if(dolzina>1)
						niza[dolzina-1]="и две"
					else
						niza[dolzina-1]="две"
					string4=niza.join(' ');
					string4+=" милијарди";
				}
				else
				{	
					if(dolzina>1)
						niza[dolzina-1]="и "+niza[dolzina-1];
					string4=niza.join(' ');
					string4+=" милијарди";
				}

				numToWords+=" "+string4;
			}

			if(string3!="")
			{
				var niza=string3.split(" ");
				var dolzina=niza.length;
				if(niza[dolzina-1]=="еден")
				{
					if(dolzina>1)
						niza[dolzina-1]="и "+niza[dolzina-1];
					string3=niza.join(' ');
					string3+=" милион";
				}
				else
				{	
					if(dolzina>1)
						niza[dolzina-1]="и "+niza[dolzina-1];
					string3=niza.join(' ');
					string3+=" милиони";
				}

				numToWords+=" "+string3;
			}

			if(string2!="")
			{
				var niza=string2.split(" ");
				var dolzina=niza.length;
				if(niza[dolzina-1]=="еден")
				{
					if(dolzina>1)
						niza[dolzina-1]="и една"
					else
						niza[dolzina-1]=""
					string2=niza.join(' ');
					string2+=" илјада";
				}
				else if(niza[dolzina-1]=="два")
				{
					if(dolzina>1)
						niza[dolzina-1]="и две"
					else
						niza[dolzina-1]="две"
					string2=niza.join(' ');
					string2+=" илјади";
				}
				else
				{	
					if(dolzina>1)
						niza[dolzina-1]="и "+niza[dolzina-1];
					string2=niza.join(' ');
					string2+=" илјади";
				}
					

				numToWords+=" "+string2;
			}
			
			if(string1!="")
			{
				var niza=string1.split(" ");
				var dolzina=niza.length;
				if(dolzina>1)
					niza[dolzina-1]="и "+niza[dolzina-1];
				string1=niza.join(' ');
				numToWords+=" "+string1;
			}

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
								string=arrayPrvDigitMac[cifra]+" "+string;
							break;
						}
						// ex: 25 or 11
						case 2:
						{
							if(cifra==1 && previousDigit!=0)
								string=arraySpecialMac[previousDigit];
							else if(cifra!=0)
								string=arrayVtorDigitMac[cifra]+" "+string;

							break;
						}
						// ex: 225
						case 3:
						{	
							if(cifra!=0)
								string=arrayTretDigitMac[cifra]+" "+string;
							break;
						}
						
					}

					counter++;
					
				}

				return string.trim();
			}
			
			return (numToWords);

		}


		//function btnPressMac()
		//{
		//	var num=parseInt(document.getElementById("input").value)
			
		//	if(isNaN(num) || num<0 || num>999999999999)
		//		document.getElementById("answer").innerHTML="Gresen INPUT";
		//	else
		//		document.getElementById("answer").innerHTML=toWordsMac(num);
			//console.log(br);
		
		//}
