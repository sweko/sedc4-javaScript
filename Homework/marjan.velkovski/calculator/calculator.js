    
    //-----------------------KEYBOARD---INPUT------------------------------------------- 
    //Numbers and +-/*=C where expected.
    //< at HOME, ± at END, √ at PGUP, sq at PGDN


    var numArr = [];                           //All the numeric input is stored here, it gets reset when any non-numeric key gets pressed. 
    var resArr = [];                           //The results of all previous operations are stored here.
    var keyArr = [];                           //All pressed keys, except for C.
    var result = 0;
    var lastOper = "";                         //The operator that was used last
    var keyboardInput = [];


    function typeOfPrevKey (keyArr) {                                              //Checks the type of the previous key 
        var x = keyArr[keyArr.length - 1];
        if (!(isNaN(parseInt(x)))){
            return "num";
        }else if (x == "=") {
            return "=";
        } else if (x == "sq" || x == "√" || x =="<" || x == "±"){
            return "advFun";
        } else {
            return "oper";
        }
    }

    function prevOper (lastOper, x, y) {                          //Serves to finish the previous operation before applying square or square root
        if (lastOper == "-") {                                                    //e.g. 2 - 6 sq gives the result 16 instead of 4
            return y - x;
        } else if (lastOper == "+") {
            return x + y;
        } else if  (lastOper == "X") {
            return x*y;
        } else {
            return parseInt(y / x);
        }
    }


    document.onkeydown = function(event) {                                          //Manages the keyboard input and changes button color on key down
        event = event || window.event;
        var value = "";
        var e = event.keyCode;
        if (e==96 || e == 48){
            value="0";
        } else if (e==97 || e == 49){
            value = "1";
        } else if (e==98 || e==50) {
            value = "2";
        } else if (e==99 || e==51) {
            value = "3";
        } else if (e==100 || e==52) {
            value = "4";
        } else if (e==101 || e==53) {
            value = "5";
        } else if (e==102 || e==54) {
            value = "6";
        } else if (e==103 || e==55) {
            value = "7";
        } else if (e==104) {
            value = "8";
        } else if (e==105 || e==57) {
            value = "9";
        }else if (e==16) {
            value="shift";
        } else if (e ==187 ) {
            if (keyboardInput[keyboardInput.length-1] == "shift") {                 //Allows for use of the shift key, so it can tell apart between +/= and 8/*
                value = "+";
            } else {
                value = "=";
            }
        } else if (e==56) {
            if (keyboardInput[keyboardInput.length-1] == "shift") {
                value = "X";
            } else {
                value = "8";
            }
        } else if (e==107){
            value = "+";
        } else if (e==106) {
            value = "X";
        } else if (e==13){
            value = "=";
        } else if (e==109 || e==189){
            value="-";
        } else if (e==111 || e==191){
            value="/";
        } else if (e==36) {
            value="<";
        } else if (e==35) {
            value="±";
        } else if (e==33) {
            value="√";
        } else if (e==34) {
            value="sq";
        } else if (e==27){
            value="C";
        }
        
        keyboardInput.push(value);
        document.getElementById(value).style.background='#7E9AA3';
        return mainFunction(value);
    }


    document.onkeyup = function(event) {                                          //Changes button color back to default on keyup
        event = event || window.event;
        var value = "";
        var e = event.keyCode;
        if (e==96 || e == 48){
            value="0";
        } else if (e==97 || e == 49){
            value = "1";
        } else if (e==98 || e==50) {
            value = "2";
        } else if (e==99 || e==51) {
            value = "3";
        } else if (e==100 || e==52) {
            value = "4";
        } else if (e==101 || e==53) {
            value = "5";
        } else if (e==102 || e==54) {
            value = "6";
        } else if (e==103 || e==55) {
            value = "7";
        } else if (e==104) {
            value = "8";
        } else if (e==105 || e==57) {
            value = "9";
        }else if (e==16) {
        } else if (e ==187 ) {
            if (keyboardInput[keyboardInput.length-2] == "shift") {                 
                value = "+";
            } else {
                value = "=";
            }
        } else if (e ==56 ) {
            if (keyboardInput[keyboardInput.length-2] == "shift") {                 
                value = "X";
            } else {
                value = "8";
            }
        } else if (e==107){
            value = "+";
        } else if (e==106) {
            value = "X";
        } else if (e==13){
            value = "=";
        } else if (e==109 || e==189){
            value="-";
        } else if (e==111 || e==191){
            value="/";
        } else if (e==36) {
            value="<";
        } else if (e==35) {
            value="±";
        } else if (e==33) {
            value="√";
        } else if (e==34) {
            value="sq";
        } else if (e==27){
            value="C";
        }

            document.getElementById(value).style.background='';
    }



    function operation(value) {                                                     //The operations take place here 
        var x = parseInt(numArr.join(""));                                          
        var y = resArr[resArr.length-1];                                            
                                    
                if (value == "+") {
                        if (resArr.length == 0){
                            result = x;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else if (numArr.length !== 0) {     
                            result = prevOper(lastOper, x, y);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else {
                            result = x + y;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } 
                } else if (value =="-") {
                        if (resArr.length == 0) { 
                            result = x;  
                            document.getElementById("display").innerHTML = result;  
                            resArr.push(result);
                        } else if (numArr.length !== 0) {     
                            result = prevOper(lastOper, x, y);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                       } else {     
                            result = y - x;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else if (value == "X") {
                        if (resArr.length == 0) {
                            result = x;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else if (numArr.length !== 0) {     
                            result = prevOper(lastOper, x, y);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                       } else {     
                            result = x * y;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else if (value == "/") {
                        if (resArr.length == 0) {
                            result = x;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else if (numArr.length !== 0) {     
                            result = prevOper(lastOper, x, y);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                       } else {     
                            result = y / x;
                            result = parseInt(result);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else if (value == "sq") {
                        if (resArr.length == 0) {
                            result = x * x;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else if (resArr.length == 1 && numArr.length !== 0) {     
                            result = prevOper(lastOper, x, y) * prevOper(lastOper, x, y) ;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else {
                            result = y*y;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else if (value == "√") {
                        if (resArr.length == 0) {
                            result = Math.sqrt(x);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else if (resArr.length == 1 && numArr.length !== 0) {     
                            result = Math.sqrt(prevOper(lastOper, x, y));
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else {     
                            result = Math.sqrt(y);
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else if (value == "<") {
                        if (resArr.length == 0) {
                            result = (x - (x % 10)) /10;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else {     
                            result = (y - (y % 10)) / 10;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                } else {
                        if (resArr.length == 0) {
                            result = x * -1;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        } else {     
                            result = y * -1;
                            document.getElementById("display").innerHTML = result;
                            resArr.push(result);
                        }
                }
    }        


    function mainFunction (value) {                                                  //Handles user input

        if(!(isNaN(parseInt(value))) && numArr.length < 12)   {                      //If number, it's stored in numArray. There's 12 digit limit
                 if ( typeOfPrevKey(keyArr) == "num" || keyArr.length == 0) {
                    numArr.push(value);
                    document.getElementById("display").innerHTML = numArr.join("");
                    keyArr.push(value);
                } else {
                    numArr=[];
                    numArr.push(value);
                    document.getElementById("display").innerHTML = numArr.join("");
                    keyArr.push(value);
                } 

        } else if (value == "=") {                                                   //If "=", calls operation() only is prev key is a number or an "="
                if (typeOfPrevKey(keyArr) == "oper" || typeOfPrevKey(keyArr) =="advFun") {                       

                } else {    
                    operation(lastOper);
                    keyArr.push(value);
                }

        } else if (value == "C") {                                                    //Resets everything
                    numArr = []; 
                    resArr = [];
                    keyboardInput = []; 
                    lastOper = ""; 
                    keyArr = [];
                    result = 0;
                    document.getElementById("display").innerHTML = "";

        } else if (value =="sq" || value=="√" || value =="<" || value == "±") {
                if (typeOfPrevKey(keyArr) !== "oper"){                                //If advFun, calls operation() if the previous key wasn't an operator
                      operation(value);
                }
                    numArr = [];
                    keyArr.push(value);

        } else {
                if (typeOfPrevKey(keyArr) == "num"){                                  //If operator, calls operation() if the previous key press was a number
                        operation(value); 
                }
                    numArr = [];
                    lastOper = value;                   
                    keyArr.push(value);
        }
}
