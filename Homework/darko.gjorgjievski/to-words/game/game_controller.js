function getRandomInteger(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
}

var randomPropertyValue = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};

function generateRandomDifficultyNumber() {
    levels = {
        easy: [1, 999999],
        medium: [1000000, 999999999],
        hard: [1000000000, 999999999999]
    }
    
    return getRandomInteger.apply(null, randomPropertyValue(levels));
}

var gameFinished = false;

function startGame() {
    // clean previous game state
    $('#enteredNumber').prop('disabled', false);
    $('#enteredNumber').val('');
    $('#successMessage').hide();
    $('#enteredNumber').focus();
    
    
    // 99999, 99999
    // prepare game data
    var randomInteger = generateRandomDifficultyNumber(); // it's a difficult game!
    var integerInWords = mk.toWords(randomInteger);
    $('#numberInWords').text(integerInWords);
    var randomIntegerText = String(randomInteger);
    gameFinished = false;
    

    // check how correct the user is
    $('#enteredNumber').on('propertychange input', function() {
        var currentValue = $(this).val();
        $('#test').text(currentValue);
        if (currentValue === '') {
            $(this).css('background-color', 'white');
        } else if (randomIntegerText.indexOf(currentValue) === 0) { // numbers match
            $(this).css('background-color', '#7FBF7F');
            if (randomIntegerText === currentValue) {
                $(this).prop('disabled', true);
                $(this).css('background-color', 'white');
                $('#successMessage').show();
                $('#successMessage').text('Честито! За друга партија, кликни тука или стисни Enter');
                gameFinished = true;
            }
        } else { // numbers don't match
            $(this).css('background-color', '#FF7F7F');
        }
    });
}

startGame();

// Offer an option to restart if successful
$('#successMessage').click(function() { 
    startGame();
}); // end click

$(document).on('keypress', function(e){
   if(e.which === 13) { // enter
      if (gameFinished) startGame();    
   }
});