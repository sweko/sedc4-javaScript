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
//
}