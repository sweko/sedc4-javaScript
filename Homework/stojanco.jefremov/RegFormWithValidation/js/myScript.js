$(function() {
    
    (function fillInSelects() {
        var $yearSelect = $('#birthYear');
        for (var i = 0; i < 117; i++) {
            var year = i + 1900;
            $yearSelect.append('<option value="' + year + '">' + year + '</option>');
        }
        var $monthSelect = $('#birthMonth');
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (var i = 0; i < 12; i++) {
            var month = i + 1;
            $monthSelect.append('<option value="' + month + '">' + months[i] + '</option>');
        }
        var $daySelect = $('#birthDay');
        for (var i = 0; i < 31; i++) {
            var day = i + 1;
            $daySelect.append('<option value="' + day + '">' + day + '</option>');
        }
    })();
    
    $('#birthYear').change(function() {
        $('#birthMonth').trigger('change');
    });
    
    $('#birthMonth').change(function() {
        var selectedMonth = Number($(this).val());
        var selectedDay = Number($('#birthDay').val());
        if (!isNaN(selectedMonth)) {
            var daysCount = countDays(selectedMonth);
        } else {
            daysCount = 31;
        }    
        $('#birthDay option[value!="default"]').remove();
        var $daySelect = $('#birthDay');
        for (var i = 0; i < daysCount; i++) {
            var day = i + 1;
            $daySelect.append('<option value="' + day + '">' + day + '</option>');
        }
        if (!isNaN(selectedDay) && selectedDay <= daysCount) {
            $('#birthDay').val(selectedDay);
        }
        function countDays(month) {
            var result = 31;
            switch (month) {
                case 4:
                case 6:
                case 9:
                case 11:
                    result = 30;
                    break;
                case 2:
                    var selectedYear = Number($('#birthYear').val());
                    if (!isNaN(selectedYear)) {
                        if (selectedYear % 4 == 0) {
                            result = 29;
                        } else {
                            result = 28;
                        }
                    }     
                    break;
            }
            return result;
        }
    });
    
    $('#signUp').click(function(e) {             
        if (empties() || invalidInputs()) {
            e.preventDefault();
        }
        
        function empties() {
            var $textInputs = $('input[type="text"],input[type="password"]');
            var result = emptyTextBoxes() || emptyDateValue() || emptyRadio();
            return result;
            
            function emptyTextBoxes() {
                var result = false;
                    for (var i = 0; i < $textInputs.length; i++) {
                        var $input = $textInputs.eq(i);
                        var $errorElement = getErrorElementFor($input);
                        $errorElement.text('');
                        if (isEmpty($input)) {
                            $errorElement.text('Enter ' + $input.attr('placeholder'));
                            result = true;
                        }
                    }
                return result;
                
                function isEmpty($input) {
                    if (!$input.val().trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                
                
            }
            
            function emptyDateValue() {
                var result = false;
                var $birthYearSelect = $('#birthYear');
                var $birthMonthSelect = $('#birthMonth');
                var $birthDaySelect = $('#birthDay');
                var $errorElement = $('#errorBirthday');
                $errorElement.text('');
                if (($birthYearSelect.val() === 'default') || ($birthMonthSelect.val() === 'default') || ($birthDaySelect.val() === 'default')) {
                    $errorElement.text('Select valid date');
                    result = true;
                }
                return result;
            }
            
            function emptyRadio() {
                var result = false;
                var checkedSexRadios = $("input[name='sex']:checked");
                var $errorElement = $('#errorSex');
                $errorElement.text('');
                if (checkedSexRadios.length == 0) {
                    $errorElement.text('Select sex');
                    result = true;
                }
                return result;
            }
        }
        
        function invalidInputs() {
            var result = false;
            var $firstNameInput = $('#firstName');
            var $lastNameInput = $('#lastName');
            var $emailOrPhoneInput = $('#emailOrPhone');
            var $passwordInput = $('#password');
            
            
            result = !isValidName($firstNameInput) || !isValidName($lastNameInput)
            || !isValidEmailOrPhone($emailOrPhoneInput);
            
            return result;
            
            function isValidName($input) {
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var nameReg = /^[A-Za-z ]+$/;
                var result = nameReg.test($input.val());
                if (!result) {
                    $errorElement.text('Enter name only from latin characters');
                }
                return result;
            }
            
            function isValidEmailOrPhone($input) {
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var result = emailReg.test($input.val());
                if (!result) {
                    var phoneReg = /^07\d[- ]?\d{3}[- ]?\d{3}$/;
                    result = phoneReg.test($input.val());
                }
                if (!result) {
                    $errorElement.text('Enter correct email or macedonian phone number in 07*-***-*** format');
                }
                return result;
            }
        }
        
        function getErrorElementFor($input) {
            return $('#error' + capitalizeFirst($input.attr('id')));
        }
        
        function capitalizeFirst(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    });
});