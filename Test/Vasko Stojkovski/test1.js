

$(document).ready(function(){

	$("#submit").click(function(){
		
		var name=$("#inputName").val();
		var email=$("#inputEmail").val();
		var number=$("#inputNumber").val();
		//console.log(name);
		//console.log(email);
		//console.log(number);
		//var emailRegex = /^[a-z0-9]*\.[a-z0-9]*\.[a-z0-9]*@[a-z]*\.(com)$/gmi;
		//var numberRegex = /^[0-9]{9}$/gmi;
		
			//if (email===emailRegex && number===numberRegex) {

			$(".tbody").append("<tr><td>"+name+"</td><td>"+email+"</td><td>"+number+"</td><td><input type=button value=Read class=btn-info /><input type=button value=Update class=btn-warning /><input type=button value=Delete class=btn-danger /></td> </tr>");
			});
		//}

		//else {
			//alert("Please enter Email and Mobile Number");
		
	var readBtn = $(".tbody").on("click", ".btn-info",function(event){
			//console.log("reading");
			var clearDisplay=$("#display").text("")
	i=0;
	var textHelp = ["Name: ", " Email: ", " Number: "];
	//console.log(textHelp);

	var theText = $(this).closest("tr").children("td").each(function(){
		var cellText = $(this).text();
		//console.log(cellText);
	
	

	var printTheCellText = $("#display").append(textHelp[i], cellText);
	i++;
	//console.log(printTheCellText);
	});

	//console.log(theText);

			
             $("#display").append("<input type=button value=Close class=btn-danger-outline />");

             $(".btn-danger-outline").click(function(){
             	$("#display").text("");
             });
     });        

		
var deleteBtn = $('.tbody').on("click", ".btn-danger", function() {
              $(this).closest("tr").fadeOut("slow");
          });

var updateBtn = $(".tbody").on("click", ".btn-warning", function(){
		console.log("oopss");

	

		
});

var addBackgroundColor = $(".tbody").on("click", "tr", function(){
	
	var theRow = $(this).children("td");
	
	var notTheLast = $(theRow).click(function(){
		var turnOff=$(this).children("td:last").off();
		//$(turnOff).off("**");
	});
	var toggleClass = $(theRow).not(":last").toggleClass("bg-primary");

	//console.log(theRow);
	//console.log(notTheLast);

	//var toggleClass = theRow.children("td").not(":last").toggleClass("bg-primary")
});
	
});


	/* $(".tbody").append('<tr id=rows><td>' +name+'</td><td>' +email+'</td><td>' +number+'</td><td><input type="button" value="Read" class="read" class=button /><input type="button" value="Update" class="update" class=button /><input type="button" value="Delete" class="erase" class=button /></td></tr>');
     
          $('.read').click(function() {
         	 
 			
             $(".display").text("Name:" +" "+name+"Email Addres:" +" "+email+"Mobile Number:" +" "+number);
             $("#display").append("<input type=button value=Delete class=delete />");

             $(".delete").click(function(){
             	$("#display").text("");
             }); 
          });


          $('.erase').click(function() {
              $(this).closest("tr").hide();
          });

	}); */