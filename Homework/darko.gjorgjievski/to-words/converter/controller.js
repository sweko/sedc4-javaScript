$('#resultTextBox').focus();

$('#resultTextBox').on('propertychange input', function() {
    var value = $('#resultTextBox').val();
    var resultsBoxEn = $('#resultDivEn');
    var resultsBoxMk = $('#resultDivMk');
    if (value === '') {
        resultsBoxEn.val('');
        resultsBoxMk.val('');
    } else {
        value = Number(value);
    }
    
    
    
    if (value > 999999999999) {
        resultsBoxEn.text('Numbers with more than 12 digits are not supported');
        resultsBoxMk.text('Неможеш да внесеш броеви со повеќе од 12 цифри');
        return false;
    }
    var numberToWordsEn = toWords(value);
    var numberToWordsMk = mk.toWords(value);
    resultsBoxEn.text('"' + numberToWordsEn + '"');
    resultsBoxMk.text('"' + numberToWordsMk + '"');
}); // end input

