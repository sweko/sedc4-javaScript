$(document).ready(function () {
    
    $('.save').click(function () {
        var name = $("#inputName").val();
        var email = $("#inputEmail").val();
        var phone = $("#inputPhone").val();

        $(".test").append('<tr><td id="name">' + name + '</td><td id="email">' + email + '</td><td id="phone">' + phone + '</td><td><input type="button" value="Read" class="read" /><input type="button" value="Update" class="update" /><input type="button" value="Delete" class="delete" /></td></tr>');


        //APPENDED FORM ACTIONS
        
        //READ
        $('.read').click(function () {
            var name = $("#inputName").val();
            var email = $("#inputEmail").val();
            var phone = $("#inputPhone").val();
            $(".infoBox").append("Name:" + " " + name + "</br>" + "Email Addres:" + " " + email + "</br>" + "Mobile Number:" + " " + phone + "<br>");
        });


        //UPDATE
        $('.update').on("click", function () {
            var $tdName = $(this).closest("tr").find("#name");
			var $tdEmail = $(this).closest("tr").find("#email");
			var $tdPhone = $(this).closest("tr").find("#phone");
			
			if ($(this).val() == "Update"){
				$tdName.html(function(){
					return "<input id='inputNameNew' type=text value='" + $tdName.text() + "'>";
				});
				
				$tdEmail.html(function(){
					return "<input id='inputEmailNew' type=text value='" + $tdEmail.text() + "'>";
				});
				
				$tdPhone.html(function(){
					return "<input id='inputPhoneNew' type=text value='" + $tdPhone.text() + "'>";
				});
				
				$(this).val("Save");
			} else {
				var $tdNameNew = $(this).closest("tr").find("#name");
				var $tdEmailNew = $(this).closest("tr").find("#email");
				var $tdPhoneNew = $(this).closest("tr").find("#phone");
				
				$tdNameNew.html(function(){
					return $tdNameNew.find("#inputNameNew").val();
				});
				
				$tdEmailNew.html(function(){
					return $tdEmailNew.find("#inputEmailNew").val();
				});
				
				$tdPhoneNew.html(function(){
					return $tdPhoneNew.find("#inputPhoneNew").val();
				});
			}
			
        });


        //DELETE
        $('.delete').on('click', function () {
            $(this).closest('tr').remove();
        });
    });
});
   

