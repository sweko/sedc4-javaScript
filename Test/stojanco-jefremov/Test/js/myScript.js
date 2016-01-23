$(function() {
    $('#submit').click(function(e) {
        e.preventDefault();
        var $nameInput = $('#nameInput');
        var $emailInput = $('#emailInput');
        var $mobileInput = $('#mobileInput');
        if (invalidInputs($emailInput, $mobileInput)) {
            return;
        }
        var currentPerson = new Person($nameInput.val(), $emailInput.val(), $mobileInput.val());
        personContainer.add(currentPerson);
        $('tbody').append('<tr>');
        var $lastRow = $('tbody tr:last-child');
        $lastRow.click(function() {
            $('tr').removeClass('blueBg');
            $(this).addClass('blueBg');
        });
        
        $('#closeDetails').click(function() {
            $('#details').fadeOut();
        });
        
        var currentPersonId = currentPerson.getId();
        
        $lastRow.append('<td id="name-' + currentPersonId + '" class="name"><span class="inputData">' + currentPerson.name 
            + '</span><input type="text" class="form-control editInput" /></td>');
        $lastRow.append('<td id="email-' + currentPersonId + '" class="email"><span class="inputData">' + currentPerson.email
             + '</span><input id="inputEmail-' + currentPersonId + '" type="text" class="form-control editInput" /><span id="errorInputEmail-' 
             + currentPersonId + '" class="errors">Error</span></td>');
        $lastRow.append('<td id="mobile-' + currentPersonId + '" class="mobile"><span class="inputData">' + currentPerson.mobile 
            + '</span><input id="inputMobile-' + currentPersonId + '" type="text" class="form-control editInput" /><span id="errorInputMobile-' 
             + currentPersonId + '" class="errors">Error</span></td>');
        var buttonsHtml = '<button type="button" class="btn btn-info-outline read">Read</button>'
            + '<button type="button" class="btn btn-warning-outline update">Update</button>'
            + '<button type="button" class="btn btn-danger-outline delete">Delete</button>';
        var hiddenInput = '<input type="hidden" name="country" value="' + currentPersonId + '">';
        $lastRow.append('<td id="action-' + currentPersonId + '">' + (buttonsHtml + hiddenInput) + '</td>');
        
        $lastRow.children('td:last-child').children('.read').click(function() {
            var personId = $(this).closest('td').find('[type=hidden]').val();
            var person = personContainer.getPerson(personId);
            $('#nameRead').text(person.name);
            $('#emailRead').text(person.email);
            $('#mobileRead').text(person.mobile);
            $('#details').fadeIn();
        });
        
        $lastRow.children('td:last-child').children('.delete').click(function() {
             var personId = $(this).closest('td').find('[type=hidden]').val();
             $(this).closest('tr').fadeOut();
             personContainer.remove(personId);
        });
        var saving = false;
        $lastRow.children('td:last-child').children('.update').click(function() {
            var personId = $(this).closest('td').find('[type=hidden]').val();
            var person = personContainer.getPerson(personId);
             if (!saving) {
                $(this).text('Save');   
                $(this).closest('tr').children('td.name').children('.editInput').val(person.name);
                $(this).closest('tr').children('td.email').children('.editInput').val(person.email);
                $(this).closest('tr').children('td.mobile').children('.editInput').val(person.mobile);
                $(this).closest('tr').children('td').children('.editInput').show().css('display', 'block');
                $(this).closest('tr').children('td').children('.inputData').hide();
                saving = !saving;
             } else {
                if (invalidInputs($('#inputEmail-' + personId), $('#inputMobile-' + personId))) {
                    return;
                }
                $(this).text('Update');
                person.name = $(this).closest('tr').children('td.name').children('.editInput').val();
                person.email = $(this).closest('tr').children('td.email').children('.editInput').val();
                person.mobile = $(this).closest('tr').children('td.mobile').children('.editInput').val();
                $(this).closest('tr').children('td.name').children('.inputData').text(person.name);
                $(this).closest('tr').children('td.email').children('.inputData').text(person.email);
                $(this).closest('tr').children('td.mobile').children('.inputData').text(person.mobile);
                $(this).closest('tr').children('td').children('.editInput, .errors').hide();
                $(this).closest('tr').children('td').children('.inputData').show();
                saving = !saving;
             }
             
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
        
    });
    
    
    
    var personContainer = {
        content: [],
        getPerson: function(personId) {
            for (var i = 0; i < this.content.length; i++) {
                var element = this.content[i];
                var currentId = element.getId();
                if (currentId == personId) {
                    return element;
                }
            }
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