$(document).ready(function () {
    var form = "<form id='formOne' ></form>";
    $("body").append(form);

    var name = "<label for='name'>Name</label></br><input type='text' id='userName' class='form-control' placeholder='Name'></input><span id='errorName'></span></br>";
    var age = "<label for='name'>Age</label></br><input type='text' id='age' class='form-control'  placeholder='Age'></input><span id='errorAge'></span></br>";
    var email = "<label for='name'>Email Address</label></br><input type='text' id='email' class='form-control'  placeholder='example@expample.com'></input><span id='errorEmail'></span></br>";
    var password = "<label for='password'>Password</label></br><input type='password' id='password' class='form-control'  placeholder='Password'></input><span id='errorPassword'></span></br>";
    var conPassword = "<label for='conPassword'>Confirm Password</label></br><input type='password' id='conPassword' class='form-control'  placeholder='Confirm Password'></input><span id='errorConfirmPass'></span></br>";
    var button = "<button type='button' id='submit' class='btn btn-primary'>Save</button>";
    var success = "<div id='done'></div";

    $("#formOne").append(name, age, email, password, conPassword, success, button);
    $("#submit").bind("click", saveForm);
});

function saveForm() {

    var name = $("#userName").val();
    var age = $("#age").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPass = $("#conPassword").val();
    var regex = /^([a-zA-z0-9]{1,25})(@)(hotmail|gmail|yahoo|live)(.com)$/;
    $("span").css({ "color": "red", "font-weight": "bold" });

    if (!isNaN(name) || name == "") {                                   //name
        $("#errorName").html("Invalid Name");
        $("#userName").val("");

    } else if (isNaN(age) || age == "" || age > 100) {                 //age
        $("#errorName").html("");
        $("#errorAge").html("Invalid Age");

        $("#age").val("");

    } else if (regex.test(email) == false) {                           //email
        $("#errorAge").html("");
        $("#errorEmail").html("Invalid Email Address");

        $("#email").val("");

    } else if (password == "" || password.length < 8) {                //password
        $("#errorEmail").html("");
        $("#errorPassword").html("Password must contain minimum 8 characters");
        $("#password").val("");
        $("#conPassword").val("");

    } else if (password != confirmPass) {          //confirm password
        $("#errorPassword").html("");
        $("#errorConfirmPass").html("Passwords are not equal");
        $("#password").val("");
        $("#conPassword").val("");

    } else {
        $("#errorConfirmPass").html("");
        $("#done").html("Success !!!").css({ "color": "green", "font-size": "2rem" });
        $("#userName").val("");
        $("#age").val("");
        $("#email").val("");
        $("#password").val("");
        $("#conPassword").val("");


    };
};