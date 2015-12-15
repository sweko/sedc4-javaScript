/*
    Overall flow of the program: http://i.imgur.com/9CjfMEC.jpg
*/

function toWords(number) {
    if (!checkIfPositiveInteger(number)) return 'Only positive integers are accepted';
    if (checkIfNumberIsZero(number)) return 'Zero';
    
    var threeDigitGroups =  splitNumberIntoGroupsOfThreeDigits(number); 
    var words =             convertThreeDigitGroupsToWords(threeDigitGroups);
    return words;
}

// f(1234) => [1, 234]
function splitNumberIntoGroupsOfThreeDigits(number) {
    var groupsOfThree = [];
     
    while (number !== 0) {
        var threeSlice = number % 1000;
        groupsOfThree.unshift(threeSlice);
        number = Math.floor(number / 1000, 10);
    }
    
    return groupsOfThree;
}

// f([1,234]) => 'one thousand two hundred thirty four'
function convertThreeDigitGroupsToWords(threeDigitsGroups) {
    var overallWord = '';
    
    addTensSuffixesToDigitGroups(threeDigitsGroups, function(digitsGroup, suffix) {
        var tensUnits = getNumberReadyForWordConversion(digitsGroup);
        var tensWords = convertTensToWordsWithSuffix(tensUnits, suffix);
        overallWord = overallWord.replace (/^/, tensWords + ' '); // add at the beginning of the string
    });
    
    return overallWord.trim().capitalizeFirstLetter(); // we use trim() coz of the empty space the code adding to beginning of the word creates
}

// f(324) => [300, 20,4], f(215) => [200, 15]
function getNumberReadyForWordConversion(number) {
    var tens = splitNumberIntoTens(number);
    var mergedTens = mergeTensAndOnesIfTheirSumIs11To19(tens);
    var nonZeroTens = removeZeroesFromCollection(mergedTens);
    return nonZeroTens;
}

// f([20,4], 'thousand') => 'twenty four thousand' 
function convertTensToWordsWithSuffix(tensUnits, suffix) {
    var words = convertTensToWords(tensUnits);
    var wordsWithSuffix = words + ' ' + suffix;
    return wordsWithSuffix;
}

// f(1) => true, f('3') => false
function checkIfPositiveInteger(number) {
   if (typeof number !== 'number' || parseInt(number, 10) !== number || number < 0) {
       return false;
   } else {
       return true;
   }

}

function checkIfNumberIsZero(number) {
    if (number === 0) return true;
    return false;
}

// f(123) => [100, 20, 3], f(103) => [100, 0, 3]
function splitNumberIntoTens(n) {
  if (n === 0) return [0];
  var arr = [];
  var i = 1;

  while (n > 0) {
    arr.unshift((n % 10) * i);
    n = Math.floor(n / 10);
    i *= 10;
  }

  return arr;
}

// We need to take care of the irregular tens units (11-19) so we later don't get
// something like "one hundred ten two" instead of "one hundred twelve"
// f([100,10,3]) => [100,13]
// f([100,20,3]) => [100,20,3]
function mergeTensAndOnesIfTheirSumIs11To19(tensUnits) {
    if (tensUnits.length === 1) return tensUnits;
    
    var lastTwoElements = tensUnits.slice(tensUnits.length - 2);
    var restOfElements = tensUnits.diff(lastTwoElements);
    var lastTwoElementsSum = lastTwoElements[0] + lastTwoElements[1];
    
    if (lastTwoElementsSum < 20 && lastTwoElementsSum > 10) {
        return restOfElements.concat(lastTwoElementsSum);
    } else {
        return tensUnits;
    }   
}

function removeZeroesFromCollection(collection) {
    return collection.filter(function(n) { return n !== 0; });   
}

// f([12, 0, 3]) => {million: 12, '': 3}
function addTensSuffixesToDigitGroups(digitGroups, action) {
    
    var suffixes = [
        '', // the last 3-unit part doesn't get any suffix
        'thousand',
        'million',
        'billion'
    ];
    
    var reversedThreeDigitWords = Array.prototype.slice.call(digitGroups).reverse(); // reverse modifies in place, we need to clone the array first to avoid this

    for (var i = 0; i < reversedThreeDigitWords.length; i++) {
        if (reversedThreeDigitWords[i] !== 0) action(reversedThreeDigitWords[i], suffixes[i]);
    }
}

// f(100,20,3) => 'one hundred twenty three'
function convertTensToWords(tensUnits) {
    var unitWords = [];
    
    var wordsByNumber = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
        100: 'one hundred',
        200: 'two hundred', // yeah I know it's a small violation of DRY...but I think it's worth the readability gain
        300: 'three hundred',
        400: 'four hundred',
        500: 'five hundred',
        600: 'six hundred',
        700: 'seven hundred',
        800: 'eight hundred',
        900: 'nine hundred'
};

    for(var i = 0; i < tensUnits.length; i++) {
        var word = wordsByNumber[tensUnits[i]];
        unitWords.push(word);
    }
    
    return unitWords.join(' '); // adding trim coz [20,0] produces ['twenty ']
} // end function

// needed this in mergeTensAndOnesIfTheirSumIs11To19() definition
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


// At the end, we need to make sure the string is capitalized in order to pass the tests
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};