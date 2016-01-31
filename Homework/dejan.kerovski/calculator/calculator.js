var operator;
var number1;
var number2;
function get0(){
document.forms[0].txtvalue.value+="0";
}
function get1(){

document.forms[0].txtvalue.value+="1";
}
function get2(){
document.forms[0].txtvalue.value+="2";
}
function get3(){
document.forms[0].txtvalue.value+="3";
}
function get4(){

document.forms[0].txtvalue.value+="4";
}
function get5(){

document.forms[0].txtvalue.value+="5";
}
function get6(){

document.forms[0].txtvalue.value+="6";
}
function get7(){
document.forms[0].txtvalue.value+="7";
}
function get8(){
document.forms[0].txtvalue.value+="8";
}
function get9(){
document.forms[0].txtvalue.value+="9";
}

function add(){
operator="+";
number1=document.forms[0].txtvalue.value;
document.forms[0].txtvalue.value = number1 + "+";
document.getElementById("display").innerHTML =number1+"+";
document.forms[0].txtvalue.value="";



}
function subtract(){
operator="-";
number1=document.forms[0].txtvalue.value;
document.getElementById("display").innerHTML =number1+"-";
document.forms[0].txtvalue.value="";

}

function multiply(){
operator="*";
number1=document.forms[0].txtvalue.value;
document.getElementById("display").innerHTML =number1+"*";
document.forms[0].txtvalue.value="";

}

function divide(){
operator="/";
number1=document.forms[0].txtvalue.value;
document.getElementById("display").innerHTML =number1+"/" ;
document.forms[0].txtvalue.value="";

}

function performCalculation(){
var result;
number2=document.forms[0].txtvalue.value;
switch (operator) {

case "+":	
result=parseInt(number1)+parseInt(number2); 
break; 

case "-":
result=parseInt(number1)-parseInt(number2);
break;

case "*":
 result=parseInt(number1)*parseInt(number2);
 break;

 case "/":
result=parseInt(number1)/parseInt(number2); 
break;

default :
result = "invalid input";
}
if(!isNaN(result)) 
document.forms[0].txtvalue.value=Math.floor(result);
document.getElementById("display").innerHTML+=number2+"="+result;

}

function cleartext(){
document.forms[0].txtvalue.value=" ";
number1="";
number2="";
result=" ";
document.getElementById("display").innerHTML=" ";
}

