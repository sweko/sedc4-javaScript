$("#form").submit(function(e) {
    e.preventDefault();
});

$("#submit").click(function() {
	$("#fillAll").remove();
	$("#useValidEmail").remove();

	var name = $("input[name=name]").val();
	var num = $("input[name=number]").val();
	var email = $("input[name=email]").val();
	var btnRead = "<button class='read'>Read </button>";
	var btnUpdate = "<button class='update'>Update </button>";
	var btnDelete = "<button class='delete'>Delete </button>";


	if (name == "" || num == "" || email == "") {
		$('#form').append("<div><p id='fillAll'>Please fill all fields properly.</p></div>");
	 } else if (chkEmail(email) == false) {
	 	$('#form').append("<div><p id='useValidEmail'>Please enter a valid email.</p></div>");
	} else {

	$('#myTable').append("<tr><td>" + name +"</td><td>" + email + "</td><td>" +
						num + "</td><td>" + btnRead + btnUpdate +btnDelete + "</td></tr>");
	}

	$(".read").bind("click", Read);
	$(".update").bind("click", Update);
	$(".delete").bind("click", Delete);

});


$(document).on("click", "#myTable tr", function(e) {

		$(".test").css("background-color", "");
		$(this).css("background-color", "#e5faff");
		$(this).attr('class', 'test');
		
});



function Delete(){ 

	var par = $(this).parent();

	par.hide( "fast", function() {
    $( this ).prev().hide( "fast", arguments.callee );
        $( this ).parent().hide(500);

  });

}; 

 function Update(){ 
	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	tdName.html("<input type='text' id='updateName' value='"+tdName.html()+"'/>");
	tdEmail.html("<input type='email' id='updateEmail' value='"+tdEmail.html()+"'/>");
	tdNumber.html("<input type='number' id='updateNumber' value='"+tdNumber.html()+"'/>");
	tdAction.html("<button class='save'>Save </button>" + "<button class='delete'>Delete </button>");


	$(".save").bind("click", Save);
	$(".delete").bind("click", Delete);
 }; 


function Save(){

	$("#fillAll").remove();
	$("#useValidEmail").remove();

	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	var name = $("input[id=updateName]").val();
	var num = $("input[id=updateNumber]").val();
	var email = $("input[id=updateEmail]").val();
	var btnRead = "<button class='read'>Read </button>";
	var btnUpdate = "<button class='update'>Update </button>";
	var btnDelete = "<button class='delete'>Delete </button>";

	if (name == "" || num == "" || email == "") {
		$('#form').append("<div><p id='fillAll'>Please fill all fields properly.</p></div>");
	 } else if (chkEmail(email) == false) {
	 	$('#form').append("<div><p id='useValidEmail'>Please enter a valid email.</p></div>");
	} else {

		tdName.html(name);
		tdEmail.html(email);
		tdNumber.html(num);
		tdAction.html(btnRead + btnUpdate +btnDelete);
	}

	$(".delete").bind("click", Delete);
	$(".update").bind("click", Update);
	$(".read").bind("click", Read);

}


function Close () {
	$("#details").remove();
}

function Read(){

	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	var btnClose = "<button class='close'>Close </button>";

	$("#details").remove();

	$('#container').append("<div id='details'> "
					+ "<b>Details:</b>"
					+ btnClose 
					+"<br/>"
					+ "Name: "
					+ tdName.html()
					+"<br/>"
					+ "Email: "
					+ tdEmail.html()
					+"<br/>"
					+ "Number: "
					+ tdNumber.html()
						+"</div>");

	$(".close").bind("click", Close);

}


function chkEmail (input) {
	var string1 = "@";
	var string2 = ".";
 
	if (input.indexOf(string1) > -1 && input.indexOf(string2) > -1 ) {
		return true;
	} else {
		return false;
	}
};