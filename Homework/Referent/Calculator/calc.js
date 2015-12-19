var items = [
    [{ id:"one", value:"1"}, { id:"two", value:"2"}, { id:"three", value:"3"}, { id:"add", value:"+", type:"operation"}], 
    [{ id:"four", value:"4"}, { id:"five", value:"5"}, { id:"six", value:"6"}, { id:"sub", value:"-", type:"operation"}],
    [{ id:"seven", value:"7"}, { id:"eight", value:"8"}, { id:"nine", value:"9"}, { id:"mul", value:"*", type:"operation"}],
    [{ id:"clear", value:"C", type:"operation"}, { id:"zero", value:"0"}, { id:"eq", value:"=", type:"operation"}, { id:"div", value:"/", type:"operation"}]
];

var Calculator = function() {
    this.init();
};

Calculator.prototype.init = function (){
    this.currentValue = 0;
    this.savedValue = 0;
    this.currentOperation = "";
    this.updateDisplay();
};

Calculator.prototype.setNumber = function(number){
   this.currentValue = this.currentValue * 10 + number;
   this.updateDisplay();
};

Calculator.prototype.setOperation = function(operation){
   if (operation === "="){
       this.performCalculation();
   } else if (operation === "C"){
       this.init();
   } else {
       this.currentOperation = operation;
       this.savedValue = this.currentValue;
       this.currentValue = 0;
   }
   this.updateDisplay();
};

Calculator.prototype.performCalculation = function(){
    switch (this.currentOperation){
        case "+":
            this.currentValue += this.savedValue;
            break;
        case "-":
            this.currentValue -= this.savedValue;
            break;
        case "*":
            this.currentValue *= this.savedValue;
            break;
        case "/":
            this.currentValue = Math.trunc(this.savedValue / this.currentValue);
            break;
    }
};

Calculator.prototype.updateDisplay = (function(){
    var display = document.getElementById("display");
    return function(){
        display.innerHTML = this.currentValue || this.savedValue;
    };
})();

var handlerGenerator = {
    number: function (value){
        var number = Number(value);
        return function (){
            calculator.setNumber(number);
        };
    },
    operation: function (value){
         return function(){
             calculator.setOperation(value);
         };
    }
};

function createTable(){
    var body = document.body;
    var table  = document.createElement('table');
    
    for (var index = 0; index < items.length; index++) {
        var rowItems = items[index];
        var tr = table.insertRow();
        for (var cellIndex = 0; cellIndex < rowItems.length; cellIndex++) {
            var item = rowItems[cellIndex];
            var td = tr.insertCell();
            if (item.id){
                var button = document.createElement("button");
                button.id = item.id;
                button.appendChild(document.createTextNode(item.value));
                item.type = item.type || "number";
                button.addEventListener("click", handlerGenerator[item.type](item.value));    
                td.appendChild(button);
            }
            else{
                td.appendChild(document.createTextNode(" "));
            }
        }
    }
    body.appendChild(table);
}

var calculator; 

document.addEventListener('DOMContentLoaded', function(){
	createTable();
    calculator = new Calculator();
});


document.addEventListener('keydown', function(event){
    if (event.keyCode === 27){
        calculator.init();
        return false;
    }
        
    if (event.keyCode === 13) {
        calculator.setOperation("=");
        return false;
    }
});

document.addEventListener('keypress', function(event){
    var char = String.fromCharCode(event.charCode);
    if ("0123456789".indexOf(char) !== -1){
        calculator.setNumber(Number(char));
        return false;
    }
    if ("+-*/=".indexOf(char) !== -1){
        calculator.setOperation(char);
        return false;
    }
        
});