/*
    Overall flow of the program: http://i.imgur.com/4rlc4ii.jpg
*/

var mk = new function() {
    this.toWords = function(number) {
        var overallWord = '';
        if (!checkIfPositiveInteger(number)) return 'Внеси позитивен цел број';
        if (checkIfNumberIsZero(number)) return 'Нула';
    
        var threeDigitsGroups =  splitNumberIntoGroupsOfThreeDigits(number); 
        
        assignTensSuffixesToNonZeroDigitGroups(threeDigitsGroups, function(digitsGroup, suffix) {
            var words = convertDigitGroupsToWords(digitsGroup, suffix);
            var wordsWithSuffix = addSuffixToWords(words, suffix); // Add suffix to words
            overallWord = overallWord.replace (/^/, wordsWithSuffix + ' '); // add at the beginning of the string, add to overall word
        });
        
        overallWord = overallWord.trim();
        overallWordWithoutPrefix = removeBeginningOnePrefixIfExists(overallWord);
        return overallWordWithoutPrefix.capitalizeFirstLetter();
};
    
        var assignTensSuffixesToNonZeroDigitGroups = function (digitGroups, action) {
            var endingWithOneSuffixes = [
                '', // the last 3-unit part doesn't get any suffix
                'илјада',
                'милион',
                'милијарда'
            ];

            var endingWithRestSuffixes = [
                '', // the last 3-unit part doesn't get any suffix
                'илјади',
                'милиони',
                'милијарди'
            ];

            var reversedThreeDigitWords = Array.prototype.slice.call(digitGroups).reverse(); // reverse modifies in place, we need to clone the array first to avoid this
            for (var i = 0; i < reversedThreeDigitWords.length; i++) {
                var digitGroup = reversedThreeDigitWords[i];
                var lastDigit = parseInt(digitGroup.toString().slice(-1), 10);
                var lastTwoDigits = parseInt(digitGroup.toString().slice(-2), 10);

                if (lastDigit === 1 && lastTwoDigits !== 11) {
                    if (reversedThreeDigitWords[i] !== 0) action(digitGroup, endingWithOneSuffixes[i]);
                } else {
                    if (reversedThreeDigitWords[i] !== 0) action(digitGroup, endingWithRestSuffixes[i]);
                } // end if 
            } // end for
    }; // end function
    
    function convertDigitGroupsToWords(digitsGroup, suffix) {
        var tensUnits = splitNumberIntoConvertableTensUnits(digitsGroup);
        var words = convertTensToWords(tensUnits, suffix);
        return words;
    }
    
    function addSuffixToWords(words, suffix) {
        if (suffix === '') {
            return words;
        } else {
            return words + ' ' + suffix;
        }
    }

    // f(100,20,3) => 'one hundred twenty three'
    var convertTensToWords = function (tensUnits, suffix) {
        var words = convertTensToWordEquivalents(tensUnits);
        var properWords = replaceIrregularOnesAndTwos(words, suffix);
        var properWordsWithAnd = addAndBetweenLastTwoWords(properWords);
        return properWordsWithAnd.join(' '); // joinWordsCollection
    };
    
    

    // f(1234) => [1, 234]
    var splitNumberIntoGroupsOfThreeDigits = function (number) {
        var groupsOfThree = [];

        while (number !== 0) {
            var threeSlice = number % 1000;
            groupsOfThree.unshift(threeSlice);
            number = Math.floor(number / 1000, 10);
        }

        return groupsOfThree;
    };
    
    

    // f([1,234]) => 'one thousand two hundred thirty four'
    var convertThreeDigitGroupsToWords = function (threeDigitsGroups) {
        return overallWord.trim().capitalizeFirstLetter(); // we use trim() coz of the empty space the code adding to beginning of the word creates
    };

    // f(324) => [300, 20,4], f(215) => [200, 15]
    var splitNumberIntoConvertableTensUnits = function (number) {
        var tens = splitNumberIntoTens(number);
        var mergedTens = mergeTensAndOnesIfTheirSumIs11To19(tens);
        var nonZeroTens = removeZeroesFromCollection(mergedTens);
        return nonZeroTens;
    };

    // f(1) => true, f('3') => false
    var checkIfPositiveInteger = function (number) {
       if (typeof number !== 'number' || parseInt(number, 10) !== number || number < 0) {
           return false;
       } else {
           return true;
       }

    };

    var checkIfNumberIsZero = function checkIfNumberIsZero(number) {
        if (number === 0) return true;
        return false;
    };

    // f(123) => [100, 20, 3], f(103) => [100, 0, 3]
    var splitNumberIntoTens = function splitNumberIntoTens(n) {
      if (n === 0) return [0];
      var arr = [];
      var i = 1;

      while (n > 0) {
        arr.unshift((n % 10) * i);
        n = Math.floor(n / 10);
        i *= 10;
      }

      return arr;
    };

    // We need to take care of the irregular tens units (11-19) so we later don't get
    // something like "one hundred ten two" instead of "one hundred twelve"
    // f([100,10,3]) => [100,13]
    // f([100,20,3]) => [100,20,3]
    var mergeTensAndOnesIfTheirSumIs11To19 = function (tensUnits) {
        if (tensUnits.length === 1) return tensUnits;

        var lastTwoElements = tensUnits.slice(tensUnits.length - 2);
        var restOfElements = tensUnits.diff(lastTwoElements);
        var lastTwoElementsSum = lastTwoElements[0] + lastTwoElements[1];

        if (lastTwoElementsSum < 20 && lastTwoElementsSum > 10) {
            return restOfElements.concat(lastTwoElementsSum);
        } else {
            return tensUnits;
        }   
    };

    var removeZeroesFromCollection = function (collection) {
        return collection.filter(function(n) { return n !== 0; });   
    };


    var convertTensToWordEquivalents = function (tensUnits) {
        var unitWords = [];

        var wordsByNumber = {
            1: 'еден', 
            2: 'два',
            3: 'три',
            4: 'четири',
            5: 'пет',
            6: 'шест',
            7: 'седум',
            8: 'осум',
            9: 'девет',
            10: 'десет',
            11: 'единаесет',
            12: 'дванаесет',
            13: 'тринаесет',
            14: 'четиринаесет',
            15: 'петнаесет',
            16: 'шеснаесет', // fixed from wiki
            17: 'седумнаесет',
            18: 'осумнаесет',
            19: 'деветнаесет',
            20: 'дваесет',
            30: 'триесет',
            40: 'четериесет',
            50: 'педесет', // fixed from wiki
            60: 'шеесет',
            70: 'седумдесет',
            80: 'осумдесет',
            90: 'деведесет', // fixed from wiki
            100: 'сто',
            200: 'двесте', // fixed from wiki
            300: 'триста',
            400: 'четиристотини',
            500: 'петстотини',
            600: 'шестотини',
            700: 'седумстотини',
            800: 'осумстотини',
            900: 'деветстотини'
    };

            for(var i = 0; i < tensUnits.length; i++) {
                var word = wordsByNumber[tensUnits[i]];
                unitWords.push(word);
            }

            return unitWords;
    }; // end function

    var removeBeginningOnePrefixIfExists = function (word) {
        var newWord = word;
        if (/^еден /.test(word)) {
            newWord = word.replace(/еден /, '');
        } else if (/^една /.test(word)) {
            newWord = word.replace(/една /, '');
        }

        return newWord;
    };

    var replaceIrregularOnesAndTwos = function (tensUnitsWords, suffix) {
        tensUnitsWords = Array.prototype.slice.call(tensUnitsWords); // duplicate the array so this function has no side effect
        if (tensUnitsWords.contains('еден') && suffix === 'илјада') {
            tensUnitsWords[tensUnitsWords.length - 1] = 'една';
        } else if (tensUnitsWords.contains('два') && suffix === 'илјади') {
            tensUnitsWords[tensUnitsWords.length - 1] = 'две';
        } else if (tensUnitsWords.contains('еден') && suffix === 'милијарда') {
            tensUnitsWords[tensUnitsWords.length - 1] = 'една';
        } else if (tensUnitsWords.contains('два') && suffix === 'милијарди') {
            tensUnitsWords[tensUnitsWords.length - 1] = 'две';
        }

        return tensUnitsWords;
    };

    var addAndBetweenLastTwoWords = function addAndBetweenLastTwoWords(tensUnitsWords) {
        tensUnitsWords = Array.prototype.slice.call(tensUnitsWords); // fuck this, next time Im using underscore.js...

        if (tensUnitsWords.length > 1) {
            tensUnitsWords.splice(tensUnitsWords.length - 1, 0, "и");
        }

        return tensUnitsWords;
    };

    // needed this in mergeTensAndOnesIfTheirSumIs11To19() definition
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };


    // At the end, we need to make sure the string is capitalized in order to pass the tests
    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    Array.prototype.contains = function(b) {
        return !!~this.indexOf(b);
    };
};