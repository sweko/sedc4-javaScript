$(document).ready(function () {
    
    $("body").prepend("<div class='container'><div id='userDiv'>Enter your username:</div><div id='passwordDiv'>Enter your password</div><div id='confirmDiv'>Confirm your password</div><div id='emailDiv'>Enter your e-mail address:</div><div id='btnDiv'></div></div>");
    var inputUsername = $("<input type='text' class='form-control' id='user'></input>");
    var passwordInput = $("<input class='form-control' type='password'></input>");
    var confirmPassword =$("<input class='form-control' type='password'></input>");
    var emailAddr = $("<input class='form-control'></input>");
    var signupBtn = $("<button class='btn btn-success-outline'>Sign Up!</button>");
    $("#userDiv").append(inputUsername);
    $("#passwordDiv").append(passwordInput);
    $("#confirmDiv").append(confirmPassword);
    $("#emailDiv").append(emailAddr);
    $("#btnDiv").append(signupBtn);
    signupBtn.click(function () {
        if(!(passwordInput.val()===confirmPassword.val())) {
        alert("your passwords don't match!");
        passwordInput.val("");
        confirmPassword.val("");
        }
        if(!isValidEmailAddress(emailAddr.val())){
            alert("your e-mail addres is not valid!");
        }
    });
    
    function isValidEmailAddress(emailAddress) {
    var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|)\.?$/gmi;
    return pattern.test(emailAddress);
};
});