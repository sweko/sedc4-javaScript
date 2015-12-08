		var operand="";
		var opMain="";
		var currentNum="0";
		var resultDiv=document.getElementById("result");

	     function numClick() 
	     {
	        var number = this.textContent || this.innerText;
	        console.log(number);

	        operand+=number;
	        resultDiv.innerHTML=operand;
	     };

	     function opClick() 
	     {
	        var operation = this.textContent || this.innerText;
	        console.log(operation);

	        if(operation=="=")
	 		{
	 			if(opMain!="")
		 			currentNum=eval(currentNum + opMain + resultDiv.textContent);
		 		resultDiv.innerHTML=parseInt(currentNum);
				operand="";
		 		opMain="";
	 			return;
	 		}

	        if(opMain=="")
	 		{
	 			opMain=operation;
	 			currentNum=resultDiv.textContent;
	 			operand="";
	 			return;
	 		}

	 		if(opMain!="" && operand!="")
	 		{
	 			currentNum=eval(currentNum+opMain+resultDiv.textContent);
	 			resultDiv.innerHTML=parseInt(currentNum);
	 			operand="";
	 			opMain=operation;
	 			return;
	 		}

	     };

	     function delClick() 
	     {
	        operand="";
			opMain="";
			currentNum="0";
			resultDiv=document.getElementById("result");
			resultDiv.innerHTML="0";
	     };

	    var arrayNumButtons = document.getElementsByClassName("number");
	    for(var i=0; i<arrayNumButtons.length; i++){
	        arrayNumButtons[i].addEventListener('click', numClick, false);
	    }

	    var arrayOpButtons = document.getElementsByClassName("operation");
	    for(var i=0; i<arrayOpButtons.length; i++){
	        arrayOpButtons[i].addEventListener('click', opClick, false);
	    }
		var btnC = document.getElementById("del");
		btnC.addEventListener('click', delClick, false);




		window.addEventListener("keydown", keyPressed, false);
 
		function keyPressed(event) 
		{
			var code = event.which;  
		  	console.log(code);
		    if(code==27)
			{
			 	document.getElementById("del").click();
			  	return;
		    }
		    if(code==13)
			{
			 	document.getElementById("=").click();
			  	return;
		    }
		     if(code==111)
			{
			 	document.getElementById("/").click();
			  	return;
		    }
		     
		    if(code==109)
			{
			 	document.getElementById("-").click();
			  	return;
		    }
		    if(code >=96 && code<=108)
		   	{
		   		code=code-97+1;
		   		document.getElementById(code).click();
		   	}
		   
		}