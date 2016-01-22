$(function() {
    $('#submit').click(function(e) {
        e.preventDefault();
        var nameInput = $('#nameInput');
        var emailInput = $('#emailInput');
        var mobileInput = $('#mobileInput');
        if (invalidInputs(emailInput, mobileInput)) {
            return;
        }
        var currentPerson = new Person(nameInput.val(), emailInput.val(), mobileInput.val());
        personContainer.add(currentPerson);
        $('tbody').append('<tr>');
        var $lastRow = $('tbody tr:last-child');
        $lastRow.click(function() {
            $('tr').removeClass('blueBg');
            $(this).addClass('blueBg');
        });
        
        $('#closeDetails').click(function() {
            $('#details').hide();
        });
        
        function invalidInputs($email, $mobile) {
            var result = false;
            
            
            result = !isValidEmail($email) || !isValidNumber($mobile);
            
            return result;
            
            function isValidEmail($input) {
                var $errorElement = getErrorElementFor($input);
                $errorElement.text('');
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var result = emailReg.test($input.val());
                if (!result) {
                    $errorElement.text('Enter correct email or macedonian phone number in 07*-***-*** format');
                }
                return result;
            }
            
            function isValidNumber($input) {
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
        
        $lastRow.append('<td id="name-' + currentPerson.getId() + '" class="name"><span class="inputData">' + currentPerson.name + '</span><input type="text" class="form-control editInput" /></td>');
        $lastRow.append('<td id="email-' + currentPerson.getId() + '" class="email"><span class="inputData">' + currentPerson.email + '</span><input type="text" class="form-control editInput" /></td>');
        $lastRow.append('<td id="mobile-' + currentPerson.getId() + '" class="mobile"><span class="inputData">' + currentPerson.mobile + '</span><input type="text" class="form-control editInput" /></td>');
        var buttonsHtml = '<button type="button" class="btn btn-info-outline read">Read</button>'
            + '<button type="button" class="btn btn-warning-outline update">Update</button>'
            + '<button type="button" class="btn btn-danger-outline delete">Delete</button>';
        var hiddenInput = '<input type="hidden" name="country" value="' + currentPerson.getId() + '">';
        $lastRow.append('<td id="action-' + currentPerson.getId() + '">' + (buttonsHtml + hiddenInput) + '</td>');
        
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
        var saving = true;
        $lastRow.children('td:last-child').children('.update').click(function() {
            saving = !saving;
            var personId = $(this).closest('td').find('[type=hidden]').val();
            var person = personContainer.getPerson(personId);
             if (!saving) {
                $(this).text('Save');   
                $(this).closest('tr').children('td.name').children('.editInput').val(person.name);
                $(this).closest('tr').children('td.email').children('.editInput').val(person.email);
                $(this).closest('tr').children('td.mobile').children('.editInput').val(person.mobile);
                $(this).closest('tr').children('td').children('.editInput').show();
                $(this).closest('tr').children('td').children('.inputData').hide();
             } else {
                $(this).text('Update');
                person.name = $(this).closest('tr').children('td.name').children('.editInput').val();
                person.email = $(this).closest('tr').children('td.email').children('.editInput').val();
                person.mobile = $(this).closest('tr').children('td.mobile').children('.editInput').val();
                $(this).closest('tr').children('td.name').children('.inputData').text(person.name);
                $(this).closest('tr').children('td.email').children('.inputData').text(person.email);
                $(this).closest('tr').children('td.mobile').children('.inputData').text(person.mobile);
                $(this).closest('tr').children('td').children('.editInput').hide();
                $(this).closest('tr').children('td').children('.inputData').show();
             }
             
        });
        
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