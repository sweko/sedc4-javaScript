$("button").click(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#number").val();
    var readBtn = "<button type=\"button\" id=\"read\" class=\"btn btn-secondary\">Read</button>";
    var updateBtn = "<button type=\"button\" id=\"update\" class=\"btn btn-success\">Update</button>";
    var deleteBtn = "<button type=\"button\" id=\"delete\" class=\"btn btn-danger\">Delete</button>";
    var regex = /^([a-zA-z0-9]{1,25})(@)(hotmail|gmail|yahoo|live)(.com)$/;

    if (!isNaN(name) || name == "" || name.length < 4) {
        $("#erorForm").html("Invalid Name");
        $("#name").val("");

    } else if (regex.test(email) == false) {           //email
        $("#erorForm").html("Invalid Email Address");
        $("#email").val("");

    } else if (isNaN(phone) || phone == "" || phone.length < 9) {
        $("#erorForm").html("Invalid Mobile Number");
        $("#number").val("");

    } else {
        $("#erorForm").html("");
        $("#editable").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + phone + "</td><td>" + readBtn + "  " + updateBtn + "  " + deleteBtn + "</td></tr>");
        $("#name").val("");
        $("#email").val("");
        $("#number").val("");
    };
    
    $(".btn-secondary").bind("click", readFunction);
    $(".btn-success").bind("click", updateFunction);
    $(".btn-danger").bind("click", deleteFunction);
});

$(document).on("click", "#editable tr", function (e) {
    $(".test").css("background-color", "");
    $(this).css("background-color", "#b3c5ff");
    $(this).attr('class', 'test');
});

function readFunction() {
    var par = $(this).parent().parent(); //tr 
    var name = par.children("td:nth-child(1)");
    var email = par.children("td:nth-child(2)");
    var phone = par.children("td:nth-child(3)");

    $("#show").html("<b>Details</b>" + "</br>" + "<b>Name:</b> " + name.html() + "<br/>" + "<b>Email Address:</b> " + email.html() + "<br/>" + "<b>Mobile Number:</b> " + phone.html() + "<br/>" + "<button type=\"button\" id=\"close\" class=\"btn btn-primary\">Close</button>");
    $("#show").css({ "width": "400px", "padding": "5px", "border": "1px solid" });
    
    $("#close").click(function () {
        $("#show").text("");
        $("#show").css("border", "0px");
    });
};

function deleteFunction() {
    var par = $(this).parent().parent();
    par.remove();
    $("#show").text("");
    $("#show").css("border", "0px");
};

function updateFunction() {
    var par = $(this).parent().parent(); //tr 
    var nameTd = par.children("td:nth-child(1)");
    var emailTd = par.children("td:nth-child(2)");
    var phoneTd = par.children("td:nth-child(3)");
    var tdButtons = par.children("td:nth-child(4)");

    nameTd.html("<input type='text' id='updateName' value='" + nameTd.html() + "'/>");
    emailTd.html("<input type='text' id='updateEmail' value='" + emailTd.html() + "'/>");
    phoneTd.html("<input type='text' id='updateNumber' value='" + phoneTd.html() + "'/>");
    tdButtons.html("<button type=\"button\" class=\"btn btn-success\">Save</button>" + "  " + "<button type=\"button\" class=\"btn btn-danger\">Delete</button>");

    $(".btn-success").bind("click", saveFunction);
    $(".btn-danger").bind("click", deleteFunction);
    //console.log("update");
};

function saveFunction() {
    var par = $(this).parent().parent(); //tr 
    var nameTd = par.children("td:nth-child(1)");
    var emailTd = par.children("td:nth-child(2)");
    var phoneTd = par.children("td:nth-child(3)");
    var tdButtons = par.children("td:nth-child(4)");

    var name = $("input[id=updateName]").val();
    var email = $("input[id=updateEmail]").val();
    var phone = $("input[id=updateNumber]").val();
    var readBtn = "<button type=\"button\" id=\"read\" class=\"btn btn-secondary\">Read</button>";
    var updateBtn = "<button type=\"button\" id=\"update\" class=\"btn btn-success\">Update</button>";
    var deleteBtn = "<button type=\"button\" id=\"delete\" class=\"btn btn-danger\">Delete</button>";
    var regex = /^([a-zA-z0-9]{1,25})(@)(hotmail|gmail|yahoo|live)(.com)$/;

    if (!isNaN(name) || name == "" || name.length < 4) {
        $("#erorForm").html("Invalid Name");
        $("#updateName").val("");

    } else if (regex.test(email) == false) {//email
        $("#erorForm").html("Invalid Email Address");
        $("#updateEmail").val("");

    } else if (isNaN(phone) || phone == "" || phone.length < 9) {
        $("#erorForm").html("Invalid Mobile Number");
        $("#updateNumber").val("");

    } else {
        $("#erorForm").html("");
        nameTd.html(name);
        emailTd.html(email);
        phoneTd.html(phone);
        tdButtons.html(readBtn + "  " + updateBtn + "  " + deleteBtn);

        $(".btn-secondary").bind("click", readFunction);
        $(".btn-success").bind("click", updateFunction);
        $(".btn-danger").bind("click", deleteFunction);
    };
};