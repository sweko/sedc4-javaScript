/*
I've decided to make this app like a state machine. The 3 global states are currentOverallNumber, previousResult, previousOperator. They keep track of any intermediate results in the operation and are assigned smart defaults so I don't have to do a bunch of ifs for the first/second operation etc.

You have either a digit(number) or an operator(string) flowing in to the calculator engine and they're mapped to corresponding HTML IDs. Then there are event handlers where each digit/operator flows to the corresponding functions and updates the operation/result displays on the HTML page.

The equal sign poses a special case, additional code is added for the purpose of emptying the 'operation' display and filling it with the data of the 'results' display.

Then each appropriate key on the keyboard is mapped to the already defined event handlers so the user can enter a bunch of numbers, press either = or enter and get the result. At the end, there are the functions which names are pretty self-evident I think.

I wanted to make this calculator more like the Windows calculator than the Google calc where you enter an operation and it's evaluated at the same time. Here, like on the Windows calculation, each time you press a particular operation, the previous stuff is being evaluated.

There are some obvious bugs, like the result being messed up if you type * more than once, etc, I've tried to make this work first for a "happy day" scenario before focusing on the edge cases.

*/

// Global states
var currentOverallNumber = 0;
var previousResult = 0;
var previousOperator = '+';

// define the digits that will flow into the main functions
var digitsByHTMLid = {
    '#one': 1,
    '#two': 2,
    '#three': 3,
    '#four': 4,
    '#five': 5,
    '#six': 6,
    '#seven': 7,
    '#eight': 8,
    '#nine': 9,
    '#zero': 0
};

// define event handlers for the digits
$.each(digitsByHTMLid, function(htmlID, digit) {
    $(htmlID).click(function() {
        result = addToOverallNumber(digit);
        updateOperationAndResultDisplays(digit, result);
    }); // end click
});

// define the operators that will flow into the main functions
var operatorsByHtmlid = {
    '#plus': '+',
    '#minus': '-',
    '#multiply': '*',
    '#divide': '/',
    '#equal': '='
};

// define event handlers for the operators
$.each(operatorsByHtmlid, function(htmlID, operation) {
    $(htmlID).click(function() {
        result = processOperator(operation);
        updateOperationAndResultDisplays(operation,result);
    }); // end click
});

// additional event handler for the equals sign
$('#equal').click(function() {
    copyDataFromResultsToOperationDisplay();
});

// event handler for the RESET button
$('#reset').click(function() {
    resetStateAndDisplay();
});

$(document).keypress(function(evt) {
    keyPressed = String.fromCharCode(evt.which);

    switch (keyPressed) {
        case '1':
            $('#one').click();
            break;
        case '2':
            $('#two').click();
            break;
        case '3':
            $('#three').click();
            break;
        case '4':
            $('#four').click();
            break;
        case '5':
            $('#five').click();
            break;
        case '6':
            $('#six').click();
            break;
        case '7':
            $('#seven').click();
            break;
        case '8':
            $('#eight').click();
            break;
        case '9':
            $('#nine').click();
            break;
        case '0':
            $('#zero').click();
            break;
        case '+':
            $('#plus').click();
            break;
        case '-':
            $('#minus').click();
            break;
        case '*':
            $('#multiply').click();
            break;
        case '/':
            $('#divide').click();
            break;
        case '=':
            $('#equal').click();
            break;
    }

}); // end keypress

// map keypad buttons to appropriate events
$(document).keydown(function(evt) {
    keyPressed = evt.keyCode ? evt.keyCode : evt.charCode;
    switch (keyPressed) {
		case 27: // esc
			$('#reset').click();
			break;
        case 13: // enter
			$('#equal').click();
			break;
	}
}); // end keyup

function resetStateAndDisplay() {
    currentOverallNumber = 0;
    previousResult = 0;
    previousOperator = '+';
    $('#operation').text('');
    $('#result').text('');
}

function updateOperationAndResultDisplays(currentDigit, overallNumber) {
    $('#operation').append(currentDigit);
    $('#result').text(overallNumber);
}

function copyDataFromResultsToOperationDisplay() {
    currentResult = $('#result').text();
    $('#operation').text(currentResult);
}


function addToOverallNumber(digit) {
    currentOverallNumber = (currentOverallNumber * 10) + digit;
    return currentOverallNumber;
}

function applyPreviousOperator() {
    var result;
    switch(previousOperator) {
        case '+':       
            result = previousResult + currentOverallNumber;
            break;
        case '-':
            result = previousResult - currentOverallNumber;
            break;
        case '*':
            result = previousResult * currentOverallNumber;
            break;
        case '/':
            result = previousResult / currentOverallNumber;
            break;
    }
    
    whole_result = Math.floor(result);
    return whole_result;
}

function updatePreviousState(operator, result) {

    if (operator === '=') {
        previousResult = 0;
        currentOverallNumber = result;
        previousOperator = '+';
    } else {
        previousResult = result;
        currentOverallNumber = 0;
        previousOperator = operator;
    }
}

// integration unit
function processOperator(operator) {
    result = applyPreviousOperator();
    updatePreviousState(operator, result);
    return result;
}
