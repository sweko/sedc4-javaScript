/**function getNumber () {
var one = document.getElementById("one").value;
var two = document.getElementById("two").value;
var three = document.getElementById("three").value;
var four = document.getElementById("four").value;
var five = document.getElementById("five").value;
var six = document.getElementById("six").value;
var seven = document.getElementById("seven").value;
var eight = document.getElementById("eight").value;
var nine = document.getElementById("nine").value;
var zero = document.getElementById("zero").value;
var dev = document.getElementById("dev").value;
var equal = document.getElementById("equal").value;
var multyplay = document.getElementById("multyplay").value;
var minus = document.getElementById("minus").value;
var result = document.getElementById("result");
console.log(minus);
}**/

var lepenje = "";
var pomosna = "";
var operator = "";

function presmetka(frist,operator4e,second)
{console.log(frist,operator4e,second);
	var rezultatot = 0;		
	switch (operator4e) {
		case "+":
		rezultatot = parseInt(frist) + parseInt(second);
		break;
		
		case "-":
		rezultatot = parseInt(frist) - parseInt(second);
		break;
		
		case "/":
		rezultatot = parseInt(frist) / parseInt(second);
		break;
		
		case "*":
		rezultatot = parseInt(frist) * parseInt(second);		
		break;
		
	}
	
	return rezultatot;
			
		
}
function printingInLabelVal (val) {
	console.log(val);
	
	switch (val) {
		
		case "+":
		operator = val;
		result.innerHTML = lepenje + " + ";
		pomosna = lepenje;
		lepenje = "";
		
		break;
		
		case "-":
		operator = val;
		result.innerHTML = lepenje + " - ";
		pomosna = lepenje;
		lepenje = "";
		break;
		
		case "/":
		operator = val;
		result.innerHTML = lepenje + " / ";
		pomosna = lepenje;
		lepenje = "";
		break;
		
		case "*":
		operator = val;
		result.innerHTML = lepenje + " * ";
		pomosna = lepenje;
		lepenje = "";
		break;
		
		case "=":
		var vratena = presmetka(pomosna,operator,lepenje);
		result.innerHTML = pomosna +" "+ operator + " " +lepenje + " = " + vratena;
		lepenje = "";
		pomosna = "";
		break;
		
		case "c":
		result.innerHTML = "";
		lepenje = "";
		pomosna = "";
		operator ="";
		break;
		
		
		
		default:
		result.innerHTML += val; 
		
		lepenje += val;
		
		console.log(lepenje);
	}
	//result.innerHTML = result.innerHTML + val;
	//console.log(result);
	
}


elements = document.getElementsByTagName("button");
for (var index = 0; index< 16; index++) {

	elements[index].onclick = function(){
		printingInLabelVal(this.value);
	};
}
