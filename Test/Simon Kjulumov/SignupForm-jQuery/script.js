function signUp($username, $password, $email, $age){
	this.username = $username;
	this.password = $password;
	this.email = $email;
	this.age = $age;
}
$(function(){
	function checkPassword(pass1, pass2){
		if(pass1 === pass2){
			return true;
		}
		else return false;
	}
	$("body").append("<h1>Sign up</h1>",
					 "<form method = 'post' action='' >");
	$("form").append("<input type ='text' name='username' placeholder ='Name'>" , "<br>",
					 "<input type ='email' name='email' placeholder='E-mail address' >", "<br>",
	 				"<input type ='text' name='moble' placeholder='Mobile number'>" , "<br>");
	$("form").append("<button type ='submit' value ='submit'>Submit </button>",
					 "<button type ='reset' value ='reset'> Cancel </button>");

	var Users = [];
	$("button[type='submit']").on("click", function(){
		var $Username = $("input[name='username']").val();
		var $pass = $("input[name='psw']").val();
		var $cpass = $("input[name='cpsw']").val();
		var $email = $("input[name='email']").val();
		var $age = $("input[name='age']").val();
		if(checkPassword($pass, $cpass)){
			var user = new signUp($Username, $pass, $email, $age);
			Users.push(user);
		}
		else alert("Password did not match");
				console.log(Users);
	});

});