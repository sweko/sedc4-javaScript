$(document).ready(function(){

$("body").append('<form data-toggle="validator" role="form" id="form"><fieldset class="form-group"><label for="formGroupExampleInput"></label><input type="text" name="name" class="form-control" id="inputUserame" placeholder="Username"></fieldset><form><fieldset class="form-group"><label for="exampleInputEmail1"></label><input type="text" name="email" class="form-control" id="inputEmail1" placeholder="Enter email"><small class="text-muted"></small></fieldset><fieldset class="form-group"><label for="exampleInputPassword1"></label><input type="password" name="password" class="form-control" id="inputPassword1" placeholder="Enter Password"></fieldset><fieldset class="form-group"><label for="exampleinputPassword1"></label><input type="password" name="confirmPassword" class="form-control" id="confirmPassword1" placeholder="Confirm Password"></fieldset><fieldset class="form-group"><label for="exampleInputPassword1"></label><input type="number" name="age" class="form-control" id="inputAge1" placeholder="Enter Age"></fieldset><button type="submit" class="btn btn-primary">Sign Up</button></form>');

$("#form").validate({
	rules: {
	name: {
		required: true
	},
	email: {
		required: true,
		custom_email: true
	},
	password: {
		required: true,
		//minlength: 8,
		custom_password: true
	},
	confirmPassword: {
		required: true,
		minlength: 8,
		equalTo: "#inputPassword1"
	},
	age: {
		required: true,
		minlength: 2,
		maxlength: 2
	}
},
	messages: {
		name: {
			required: "Please enter your name",
		},
		
	
		email: {
			required: "Please enter your email addres"
		},
		password: {
			required: "Please enter your password",
			minlength: "Your password must contain at least 8 caracters"
		},
		confirmPassword: {
			required: "Please confirm your password",
			minlength: "Your password must contain at least 8 caracters",
			equalTo: "Please enter the same password as above"
		},
		age: {
			required: "Please enter your age",
			minlength: "You are too young to sign in",
			maxlength: "Please enter a valid age"
		}
		}
	});

});
$.validator.addMethod("custom_password", function(value, element) {
    return this.optional(element) ||
        value.match(/(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[0-7]).{8,}$/);
}, " Please enter a password with at least 8 characters, including one number and one special character");

$.validator.addMethod("custom_email", function(value, element) {
    return this.optional(element) ||
        value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/);
}, "Please enter a valid Email address");

