/* this "trial version" only has the minimum requirements:
	
	~ has an output display where the result is displayed
	~ has buttons for the digits (0-9)
	~ has buttons for the operations (+, -, *, /)
	~ has button for operation execution (=)
	~ has the optional button for clearance (C)
	~ the calculator supports doing operations only on single digit numbers.
	~ the division operator does integer division
	~ the result of the operation is displayed in the output display; (operation and operands are not displayed)
*/

var arrayCalc = [];

function one(){
	arrayCalc.push("1"); 
}
function two(){
	arrayCalc.push("2");
}
function three(){
	arrayCalc.push("3");
}
function four(){
	arrayCalc.push("4");
}
function five(){
	arrayCalc.push("5");
}
function six(){
	arrayCalc.push("6");
}
function seven(){
	arrayCalc.push("7");
}
function eight(){
	arrayCalc.push("8");
}
function nine(){
	arrayCalc.push("9");
}
function zero(){
	arrayCalc.push("0");
}

var arrayOperator = []

function plus() {
	arrayOperator.push("+");
}

function minus(){
	arrayOperator.push("-");
}
function div(){
	arrayOperator.push("/");
}

function mult(){
	arrayOperator.push("*");
} 

var arrayRezultat = [];

function equals(){
	var result=0;
	if (arrayOperator[0] === "+") {
		result = parseInt(arrayCalc[0]) + parseInt(arrayCalc[1]);
		arrayRezultat.push (result);
		showResult();
	}
	
	else if (arrayOperator[0] === "-") {
			result = parseInt(arrayCalc[0]) - parseInt(arrayCalc[1]);
			arrayRezultat.push (result);
			showResult();
	}

	else if (arrayOperator[0] === "/") {
			result = parseInt(arrayCalc[0]) / parseInt(arrayCalc[1]);
			arrayRezultat.push (parseInt(result));
			showResult();
	}
	else (arrayOperator[0] === "*") 
			result = parseInt(arrayCalc[0]) * parseInt(arrayCalc[1]);
			arrayRezultat.push (result);
			showResult();
	
}

function clearDisplay () {
	document.getElementById("display").innerHTML="";
	arrayCalc=[];
	arrayOperator=[];
	arrayRezultat=[];
	
}


var konecenRezultat = arrayRezultat[0];


function showResult() {
	document.getElementById("display").innerHTML=arrayRezultat[0];
}
