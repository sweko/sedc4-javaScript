function toWords(number) {
    if (!checkIfPositiveInteger(number)) throw new Error('Input not a positive integer');
    
    if (number === 0) return 0;
    var groupsOfThreeWords = [];
    
    var groupsOfThreeNumbers = separateNumberIntoGroupsOfThree(number);
    
    for (var i = 0; i < groupsOfThreeNumbers.length; i++) {
        var irregularTensUnits = separateNumberIntoTensUnits(groupsOfThreeNumbers[i]);
        var tensUnits = convertIrregularTensUnits(irregularTensUnits);
        var tensUnitsWords = convertTensUnitsToWords(tensUnits);
        groupsOfThreeWords.push(tensUnitsWords);
        
    }
    
    result = addSuffixes(groupsOfThreeWords);
    
    return result.capitalizeFirstLetter();
}

// f(1234) => [1, 234]
function separateNumberIntoGroupsOfThree(number) {
    groupsOfThree = [];
     
    while (number !== 0) {
        threeSlice = number % 1000;
        groupsOfThree.unshift(threeSlice);
        number = Math.floor(number / 1000, 10);
        
    }
    
    return groupsOfThree;
}

// Got some help for this from SO
// f(123) => [100, 20, 3] 
function separateNumberIntoTensUnits(n) {
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
function convertIrregularTensUnits(tensUnits) {
    if (tensUnits.length === 1) return tensUnits;
    
    lastTwoElements = tensUnits.slice(tensUnits.length - 2);
    restOfElements = tensUnits.diff(lastTwoElements);
    lastTwoElementsSum = lastTwoElements[0] + lastTwoElements[1];
    
    if (lastTwoElementsSum < 20) {
        return restOfElements.concat(lastTwoElementsSum);
    } else {
        return tensUnits;
    }
    
}

// f(100,20,3) => 'one hundred twenty three'
function convertTensUnitsToWords(tensUnits) {
    var unitWords = [];
    
    wordsByNumber = {
        0: '',
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
    
    return unitWords.join(' ');
} // end function

// f(['three', 'one hundred twelve']) => 'three thousand one hundred twelve'
function addSuffixes(threeDigitWords) {
    var wordsWithSuffixes = [];
    
    suffixes = [
        '', // the last 3-unit part doesn't get any suffix
        'thousand',
        'million',
        'billion'
    ];
    
    reversedThreeDigitWords = Array.prototype.slice.call(threeDigitWords).reverse(); // reverse modifies in place, we need to clone the array first to avoid this

    for (var i = 0; i < reversedThreeDigitWords.length; i++) {
        wordWithSuffix = reversedThreeDigitWords[i] + ' ' + suffixes[i];
        wordsWithSuffixes.unshift(wordWithSuffix);
    }
    
    return wordsWithSuffixes.join(' ').trim();
}



function checkIfPositiveInteger(input) {
    if (typeof input === 'number' && parseInt(input, 10) === input && input >= 0) {
        return true;
    } else {
        return false;
    }
}

// needed this in convertIrregularTensUnits() definition
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

// At the end, we need to make sure the string is capitalized in order to pass the tests
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
