var array = [1, 2, 3, 4, 5, 7, 9, 11];

var squareArray = function (array) {
    var result = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        result.push(element * element);
    }
    return result;
};

var halfArray = function (array) {
    var result = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        result.push(element / 2);
    }
    return result;
};

var sinArray = function (array) {
    var result = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        result.push(Math.sin(element));
    }
    return result;
};

var objectArray = function (array) {
    var result = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        result.push({
            item: element,
            index: index
        });
    }
    return result;
};


var booleanArray = function (array) {
    var result = [];
    var len = array.length;
    for (var index = 0; index < len; index++) {
        var element = array[index];
        result.push(!!element);
    }
    return result;
};


var genericIterator = function(array, operation){
    var result = [];
    var len = array.length;
    for (var index = 0; index < len; index++) {
        var element = array[index];
        result.push(operation(element));
    }
    return result;
};

var squareNumber = function(x){return x*x;};
var halfNumber = function(x){return x/2;};
var sinNumber = function(x){return Math.sin(x);};
var boolNumber = function(x){return !!x;};

var squares = genericIterator(array, squareNumber);

var bools = genericIterator(array, function(x){return !!x;});


