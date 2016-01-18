var singles = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tens = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var thousands = ['', 'thousand', 'million', 'billion'];

var toWords = function (number) {
    if (Number(number) !== number)
        throw new Error("number is not actually a number");

    if (number < 0)        
        throw new Error("does not work for negative numbers");

    var result = capitaliseFirstLetter(numberToWordsImpl(number).trim() || singles[0]);
    return result;
};

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var numberToWordsImpl = function (number) {
    if (number === 0)
        return "";
    if (number < 10)
        return singles[number];
    if ((number > 10) && (number < 20))
        return teens[number - 10 - 1];
    if (number < 100) {
        var low = number % 10;
        var high = Math.floor(number / 10);
        if (low === 0) {
            return tens[high - 1];
        }
        else {
            return tens[high - 1] + " " + singles[low];
        }
    }
    if (number < 1000) {
        var low = number % 100;
        var high = Math.floor(number / 100);
        return singles[high] + " hundred " + numberToWordsImpl(low);
    }
    var thouNums = splitThousands(number);
    var thouWords = [];
    for (var i = 0; i < thouNums.length; i++) {
        var current = numberToWordsImpl(thouNums[i]);
        if (current !== '') {
            thouWords.push(current + ' ' + thousands[i]);
        }
    }
    thouWords.reverse();
    var result = thouWords[0];
    for (var i = 1; i < thouWords.length; i++) {
        result += ' ' + thouWords[i];
    }
    return result;
};

var splitThousands = function (number) {
    var result = [];
    while (number !== 0) {
        var thousand = number % 1000;
        number = Math.floor(number / 1000);
        result.push(thousand);
    }
    return result;
};