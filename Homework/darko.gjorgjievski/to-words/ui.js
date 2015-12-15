$('#resultTextBox').focus();

$('#resultTextBox').on('propertychange input', function() {
    var value = Number($('#resultTextBox').val());
    var resultsBox = $('#resultDiv');
    
    if (value > 999999999999) {
        resultsBox.text('Numbers with more than 12 digits are not supported');
        return false;
    }
    var numberToWords = toWords(value);
    resultsBox.text('"' + numberToWords + '"');
}); // end input

