
$(document).ready(function(){
 
  $("#close").click(function() {
    $(".d").hide(); 
  });

     $('.plusbtn').click(function() {
          var name = $("#inputName").val();
          var email = $("#inputEmail").val();
          var phone = $("#inputPhone").val();

          // $(".test").append('<tr><td>' +name+'</td><td>' +email+'</td><td>' +phone+'</td><td><input type="button" value="Read" class="read" /><input type="button" value="Update" class="update" /><input type="button" value="Delete" class="delete" /></td></tr>');
     
            var row = $("<tr>");
    
            $("#tableList").append(row);
            row.append("<td class='name'>" + name + "</td>");
            row.append("<td class='email'>" + email + "</td>");
            row.append("<td class='mobileNumber'>" + phone + "</td>");

            var readBtn = $("<button class='btn btn-secondary' id='readBtn'>"+ "Read" +"</button>");
            var deleteBtn = $("<button class='btn btn-danger' id='deleteBtn'>" + "Delete" + "</button>");
            var updateBtn = $("<button class='btn btn-primary' id='updateBtn'>" + "Update" + "</button>");
            var newUpdateBtn = $("<button class='btn btn-primary' id='newUpdateBtn'>" + "Save" + "</button>").hide();
            $("<td>").appendTo(row).append(readBtn).append(deleteBtn).append(updateBtn).append(newUpdateBtn);
            $('#inputName').val('');
            $('#inputEmail').val('');
            $('#inputPhone').val('');

            
            readBtn.click(function() {
              $(".disc").text("Name:" +" "+name+" "+"Email Addres:" +" "+email+" "+"Mobile Number:" +" "+phone);
            });

            

          deleteBtn.click(function() {
              $(this).closest("tr").hide();
              $(".disc").text("");

          });
          
          
          updateBtn.click(function() {
            
            $(this).closest("tr").children("td[class='name']").text("");
            $(this).closest("tr").children("td[class='name']").append("<input class='newName'></input>");           
            $(this).closest("tr").children("td[class='name']").children(".newName").val(name);
            //$(".newName").val(name);

            
            
            $(this).closest("tr").children("td[class='email']").text("");
            $(this).closest("tr").children("td[class='email']").append("<input class='newEmail'></input>");
            $(this).closest("tr").children("td[class='email']").children(".newEmail").val(email);
            //$(".newEmail").val(email);
            
            $(this).closest("tr").children("td[class='mobileNumber']").text("");
            $(this).closest("tr").children("td[class='mobileNumber']").append("<input class='newMobileNumber'></input>");
            $(this).closest("tr").children("td[class='mobileNumber']").children(".newMobileNumber").val(phone);
            //$(".newMobileNumber").val(phone);

            $(updateBtn).hide();
            $(newUpdateBtn).show();

          });


          newUpdateBtn.click(function() {
            //var newName = $(".newName").val(); 
            var newName = ($(this).closest("tr").children("td[class='name']").children(".newName")).val();        
            //var newEmail = $(".newEmail").val();
            var newEmail = ($(this).closest("tr").children("td[class='email']").children(".newEmail")).val();
            //var newMobileNumber = $(".newMobileNumber").val();
            var newMobileNumber = ($(this).closest("tr").children("td[class='mobileNumber']").children(".newMobileNumber")).val();
            $(this).closest("tr").children("td").children("input").hide();
            $(this).closest("tr").children("td[class='name']").text(newName);
            $(this).closest("tr").children("td[class='email']").text(newEmail);
            $(this).closest("tr").children("td[class='mobileNumber']").text(newMobileNumber);
            $(newUpdateBtn).hide();
            $(updateBtn).show();
            name = newName;
            email = newEmail;
            phone = newMobileNumber;
          });




          $(".test tr").click(function() {
            $(this).addClass("selected");

          });

      });

});
 









 