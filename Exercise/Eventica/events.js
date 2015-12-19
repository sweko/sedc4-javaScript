function Calculator(){
	this.firstNumber = 0;
	this.secondNumber = 0;
	this.operation = "+";
	this.result = 0;
	
	this.operate = function(){
		this.result = eval(this.firstNumber + this.operation + this.secondNumber);
	};
}

// function doCalculation(){
// 	var c = new Calculator();
// 	c.firstNumber = 7;
// 	c.secondNumber = 12;
// 	c.operate();
// 	alert(c.result);
// }

document.addEventListener('DOMContentLoaded',  function(){
	createCalculatorInput();
});


function createCalculatorInput(){
   var content = document.getElementById("content");
   
   
   
   var select = document.createElement("select");
   var operations = [
	   { text:"Add", value:"+"},
	   { text:"Subtract", value:"-"},
	   { text:"Multiply", value:"*"},
	   { text:"Divide", value:"/"},
   ];
   for (var index = 0; index < operations.length; index++) {
	   var option = document.createElement("option");
	   option.text = operations[index].text;
	   option.value = operations[index].value;
	   select.appendChild(option);
   }
   content.appendChild(select);
   
   var button = document.createElement("button");
   button.innerHTML = "Click me!";
   content.appendChild(button);
   
   var resultDiv = document.createElement("div");
   resultDiv.id="result";
   content.appendChild(resultDiv);
}