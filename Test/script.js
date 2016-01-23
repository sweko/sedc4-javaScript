$("#form").submit(function(e) {
    e.preventDefault();
});

$("#submit").click(function() {

	$('#myTable').append("<tr><td>" + 
						$("input[name=name]").val() +
						"</td><td>" + 
						$("input[name=email]").val() +
						"</td><td>" +
						$("input[name=number]").val() +
						"</td><td>" +
						"<button class='read'>Read </button>"+
						"<button class='update'>Update </button>"+
						"<button class='delete'>Delete </button>"+
						"</td></tr>");

	$(".read").bind("click", Read);
	$(".update").bind("click", Update);
	$(".delete").bind("click", Delete).bla

});


$(document).on("click", "#myTable tr", function(e) {

		$(".test").css("background-color", "");



		$(this).css("background-color", "#e5faff");
		$(this).attr('class', 'test');
		
});



function Delete(){ 
	var par = $(this).parent().parent(); 
	par.hide();
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

	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	tdName.html($("input[id=updateName]").val());
	tdEmail.html($("input[id=updateEmail]").val());
	tdNumber.html($("input[id=updateNumber]").val());

	tdAction.html("<button class='read'>Read </button>"+
				  "<button class='update'>Update </button>"+
				  "<button class='delete'>Delete </button>");

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

	$("#details").remove();

	$('body').append("<div id='details'> "
					+ "<b>Details:</b>"
					+"<button class='close'>Close </button>" 
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