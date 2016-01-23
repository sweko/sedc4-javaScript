var box=document.getElementById('display');

function addDigit (digit) {
	box.value += digit;      // add every value of digit in display/iputtext
  
    if (x==="C") {
         box.value = " "; // clear screen operation
    }

}

function displayValue() {

	box.value = eval(box.value) // I use simple function for evaluate
	                            // and unswer stored in box.value
   
}

