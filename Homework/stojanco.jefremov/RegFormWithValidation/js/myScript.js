$(function() {
    (function generateForm(params) {
        var $section = $('<section>')
                        .attr('id', 'regForm')
                        .addClass('container')
                        .appendTo('body');
        $('<h1>').text('Sign Up').appendTo($section);
        $('<h2>').text('It’s free and always will be.').appendTo($section);
        var $form = $('<form>').appendTo($section);
        addRowWithTextBox($form, 'firstName', 'text');
        addRowWithTextBox($form, 'lastName', 'text');
        addRowWithTextBox($form, 'emailOrPhone', 'text');
        addRowWithTextBox($form, 'password', 'password');
        addRowWithTextBox($form, 'confirmPassword', 'password');
        var $birthRow = addEmptyRow($form);
        $('<label>').attr('for', 'birthYear')
                        .addClass('col-sm-2 col-sm-offset-2 col-lg-offset-3 form-control-label')
                        .text('Birthday')
                        .appendTo($birthRow);
        var $selectsDiv = addDivTo($birthRow, 'col-sm-6 col-lg-3');
        addSelectTo($selectsDiv, 'year');
        addSelectTo($selectsDiv, 'month');
        addSelectTo($selectsDiv, 'day');
        addErrorElement($birthRow, 'birthday');
        var $sexRow = addEmptyRow($form);
        $('<label>').addClass('col-sm-2 col-sm-offset-2 col-lg-offset-3')
                        .text('Sex')
                        .appendTo($sexRow);
        var $radiosDiv = addDivTo($sexRow, "col-sm-4 col-lg-2");
        addRadioTo($radiosDiv, 'sex', 'male');
        addRadioTo($radiosDiv, 'sex', 'female');
        addErrorElement($sexRow, 'sex');
        var $submitRow = addEmptyRow($form);
        var $submitButton = $('<button>').attr('id', 'signUp')
                                         .attr('type', 'submit')
                                         .addClass('btn btn-secondary')
                                         .text('Sign up');
        addDivTo($submitRow, 'col-sm-offset-4 col-sm-8 col-lg-7 col-lg-offset-5')
                .append($submitButton);
        
        function addErrorElement($addToElement, forElementId) {
            var $errorDiv = addDivTo($addToElement, 'col-sm-2 col-lg-3');
            $('<span>').attr('id', 'error' + capitalizeFirst(forElementId))
                        .addClass('errors')
                        .appendTo($errorDiv);
        }
        
        function addRadioTo($element, radioName, radioValue) {
            var $radioDiv = addDivTo($element, 'radio');
            var $radioButton = $('<input>').attr('type', 'radio')
                                            .attr('name', radioName)
                                            .attr('id', radioValue + 'Radio')
                                            .val(radioValue);
            $('<label>').append($radioButton)
                        .append('&nbsp;' + capitalizeFirst(radioValue))
                        .appendTo($radioDiv);
        }
        
        
        function addDivTo($element, divClass) {
            var $addedDiv = $('<div>').appendTo($element);
            if (divClass) {
                $addedDiv.addClass(divClass);
            }
            return $addedDiv;
        }
        
        function addSelectTo($element, selectId) {
            var id = 'birth' + capitalizeFirst(selectId);
            var $select = $('<select>').attr('id', id )
                            .attr('name', id)
                            .appendTo($element);
            $('<option>').val('default').text(capitalizeFirst(selectId))
                        .appendTo($select);
        }
        
        function addRowWithTextBox($form, inputId, inputType) {
            var $rowDiv = addEmptyRow($form);
            var labelText = inputId.replace(/[A-Z]/g, function(match) {
                return ' ' + match.toLowerCase();
            });
            labelText = capitalizeFirst(labelText);
            $('<label>').attr('for', inputId)
                        .addClass('col-sm-2 col-sm-offset-2 col-lg-offset-3 form-control-label')
                        .text(labelText)
                        .appendTo($rowDiv);
            var $inputDiv = addDivTo($rowDiv, 'col-sm-6 col-lg-4');
            $('<input>').attr('type',inputType).attr('id', inputId)
                        .attr('name', inputId)
                        .attr('placeholder', labelText)
                        .addClass('form-control')
                        .appendTo($inputDiv);
            addErrorElement($rowDiv, inputId);
        }
        
        function addEmptyRow($form) {
            return addDivTo($form, 'form-group row');
        }
        
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
        } else {
            alert('You have successfuly signed up.');
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
            var $confirmPasswordInput = $('#confirmPassword');
            
            result = !isValidName($firstNameInput) || !isValidName($lastNameInput)
                || !isValidEmailOrPhone($emailOrPhoneInput) 
                || !isValidPassword($passwordInput) || !doPasswordsMatch($passwordInput, $confirmPasswordInput);
            
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
            
            function isValidPassword($input) {
                var passReg = /^(?=.*\d)(?=.*[!@#$%^&*\-_,\.\/\?<>;:'"\[\]\+=\(\)`~\\\|])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*\-_,\.\/\?<>;:'"\[\]\+=\(\)`~\\\|]{8,16}$/;
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var result = passReg.test($input.val());
                if (!result) {
                    $errorElement.text('Enter password that contains at least 1 lowercase character, 1 uppercase character, 1 number, 1 special character and has length between 8 and 16 characters.');
                }
                return result;
            }
            
            function doPasswordsMatch($passwordInput, $confirmPasswordInput) {
                var result = $passwordInput.val() === $confirmPasswordInput.val();
                var $errorElement = getErrorElementFor($confirmPasswordInput);
                if (!result) {
                    $errorElement.text('Passwords must match');
                }
                return result;
            }
        }
        
        function getErrorElementFor($input) {
            return $('#error' + capitalizeFirst($input.attr('id')));
        }
        
    });
    
    function capitalizeFirst(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
});