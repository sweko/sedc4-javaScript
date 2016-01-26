$(function() {
    
    var saving = false;
    
    $('tbody').click(function(e) {
        
        var $target = $(e.target);
        $('tr').removeClass('blueBg');
        var $row = $($target.closest('tr'));
        $row.addClass('blueBg');
        
        if ($target.attr('type') === 'button') {
            
            if ($target.hasClass('read')) {//readButton
            
                var personId = $row.data('personId');
                var person = personContainer.getPerson(personId);
                $('#nameRead').text(person.name);
                $('#emailRead').text(person.email);
                $('#mobileRead').text(person.mobile);
                $('#details').fadeIn();
                
            } else if ($target.hasClass('delete')) {//deleteButton
            
                var personId = $row.data('personId');
                $row.fadeOut();
                personContainer.remove(personId);
                
            } else if ($target.hasClass('update')) {//updateButton
            
                var personId = $row.data('personId');
                var person = personContainer.getPerson(personId);
                if (!saving) {
                    $target.text('Save');
                    $('#inputName-' + personId).val(person.name);
                    $('#inputEmail-' + personId).val(person.email);
                    $('#inputMobile-' + personId).val(person.mobile);
                    $row.children('td').children('.editInput').show().css('display', 'block');
                    $row.children('td').children('.inputData').hide();
                    saving = !saving;
                    
                } else {
                    
                    if (invalidInputs($('#inputEmail-' + personId), $('#inputMobile-' + personId))) {
                        return;
                    }
                    
                    $target.text('Update');
                    person.name = $('#inputName-' + personId).val();
                    person.email = $('#inputEmail-' + personId).val();
                    person.mobile = $('#inputMobile-' + personId).val();
                    $('#tdName-' + personId + ' span.inputData').text(person.name);
                    $('#tdEmail-' + personId + ' span.inputData').text(person.email);
                    $('#tdMobile-' + personId + ' span.inputData').text(person.mobile);
                    $row.children('td').children('.editInput, .errors').hide();
                    $row.children('td').children('.inputData').show();
                    saving = !saving;
                    
                }
            }
        }
    });
    
    $('#closeDetails').click(function() {
        $('#details').fadeOut();
    });
    
    $('#submit').click(function(e) {
        
        e.preventDefault();
        
        var $nameInput = $('#nameInput');
        var $emailInput = $('#emailInput');
        var $mobileInput = $('#mobileInput');
        if (invalidInputs($emailInput, $mobileInput)) {
            return;
        }
        
        var currentPerson = new Person($nameInput.val(), $emailInput.val(), $mobileInput.val());
        var currentPersonId = currentPerson.getId();
        personContainer.add(currentPerson);
        
        var $lastRow = $('<tr>');
        $lastRow.data('personId', currentPersonId);
        $lastRow.appendTo('tbody');
        
        var $tdName = $('<td>')
                .appendTo($lastRow)
                .attr('id', 'tdName-' + currentPersonId)
                .attr('class', 'name');
        $('<span>').attr('class', 'inputData')
                    .text(currentPerson.name)
                    .appendTo($tdName);
        $('<input>').attr('class', 'form-control editInput')
                    .attr('type', 'text')
                    .attr('id', 'inputName-' + currentPersonId)
                    .val(currentPerson.name)
                    .appendTo($tdName);
        
        var $tdEmail = $('<td>')
                .appendTo($lastRow)
                .attr('id', 'tdEmail-' + currentPersonId)
                .attr('class', 'email');
        $('<span>').attr('class', 'inputData')
                    .text(currentPerson.email)
                    .appendTo($tdEmail);
        $('<input>').attr('class', 'form-control editInput')
                    .attr('type', 'text')
                    .attr('id', 'inputEmail-' + currentPersonId)
                    .val(currentPerson.email)
                    .appendTo($tdEmail);
         $('<span>').attr('class', 'errors')
                    .attr('id', 'errorInputEmail-' + currentPersonId)
                    .appendTo($tdEmail);
         
         var $tdMobile = $('<td>')
                .appendTo($lastRow)
                .attr('id', 'tdMobile-' + currentPersonId)
                .attr('class', 'mobile');
        $('<span>').attr('class', 'inputData')
                    .text(currentPerson.mobile)
                    .appendTo($tdMobile);
        $('<input>').attr('class', 'form-control editInput')
                    .attr('type', 'text')
                    .attr('id', 'inputMobile-' + currentPersonId)
                    .val(currentPerson.mobile)
                    .appendTo($tdMobile);
         $('<span>').attr('class', 'errors')
                    .attr('id', 'errorInputMobile-' + currentPersonId)
                    .appendTo($tdMobile);
        
        var $tdAction = $('<td>')
                        .appendTo($lastRow)
                        .attr('id', 'tdAction-' + currentPersonId);
        var $readButton = $('<button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-info-outline read')
                            .text('Read');
        var $updateButton = $('<button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-warning-outline update')
                            .text('Update');
        var $deleteButton = $('<button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-danger-outline delete')
                            .text('Delete');
        $tdAction.append($readButton)
                 .append($updateButton)
                 .append($deleteButton);
        
    });
    
    function invalidInputs($email, $mobile) {
            var result = false;
            $('.errors').text(''); 
            result = !isValidEmail($email) || !isValidNumber($mobile);           
            return result;
            
            function isValidEmail($input) {
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                var result = emailReg.test($input.val());
                if (!result) {
                    $errorElement.show();
                    $errorElement.text('Enter valid email address');
                }
                return result;
            }
            
            function isValidNumber($input) {
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var phoneReg = /^\d{9,}$/;
                result = phoneReg.test($input.val());
                if (!result) {
                    $errorElement.show();
                    $errorElement.text('Enter valid number only with digits');
                }
                return result;
            }
            
            function getErrorElementFor($input) {
                return $('#error' + capitalizeFirst($input.attr('id')));
            }
            
            function capitalizeFirst(text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            }
            
        }
    
    var personContainer = {
        content: [],
        getPerson: function(personId) {
            var id = Number(personId);
            var index = this.content.findIndex(function(p) { return p.getId() === id; });
            return this.content[index];
        } ,
        add: function(person) {
            this.content.push(person);
        },
        remove: function(personId) {
            var personForRemove = this.getPerson(personId);
            var index = this.content.indexOf(personForRemove);
            this.content.splice(index, 1);
        }
         
    };
    
    function Person(name, email, mobile) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        if (!Person.id) {
            Person.id = 0;
        }
        var id = ++Person.id;
        this.getId = function() {
            return id;
        }
    }
});