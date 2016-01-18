function test(message, actual, expected){
    var result = document.getElementById("result");
    var presult = document.createElement("p");
   
    if (actual === expected) {
        presult.innerHTML = message + " passes successfully";
    } else {
        presult.innerHTML = message + " fails, expected "+expected + " actual " + actual;
    }
    result.appendChild(presult);
}


