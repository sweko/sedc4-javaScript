 $(function() { 
  


  // add new contact 
  $("#add").click(function() {  
     var name = $("#name").val();
     var email = $("#email").val();
     var phone = $("#phone").val();
     $(".table tbody").prepend( 
    "<tr>"+ 
    "<td>" + name + "</td>"+ 
    "<td>" + email + "</td>"+ 
    "<td>" + phone + "</td>"+ 
    '<td><input type="button"  id="print" class="btn btn-secondary btn-sm" value="Print"></input><input type="button" id="remove" class="btn btn-danger btn-sm" value="Remove"></input> <input class="btn btn-primary edit btn-sm" type="button" value="Edit" /></input><input class="btn btn-success-outline save btn-sm" type="button" value="Save" /></input></td></tr>'); 
    //clear input form   </input><input class="btn btn-danger-outline cancel btn-sm" type="button" value="Cancel"/>
     var name = $("#name").val('');
     var email = $("#email").val('');
     var phone = $("#phone").val('');
     });

  

   //remove contacts button
   $('.table tbody').on( 'click', '#remove', function (event) {
     event.preventDefault();
     $(this).closest("tr").remove();
    });
  
  
  // delete printed contact in div
     $('.display').on("click", "#deletePrint", function(event){ //user click on remove text
        var element = $('.display').val();
        $(this).parent(element).remove();    
    });



 // Print function in Div
   $('.table tbody').on( 'click', '#print', function (event) {
    var par = $(this).parent().parent(); 
    var tdName = par.children("td:nth-child(1)"); 
    var tdPhone = par.children("td:nth-child(2)"); 
    var tdEmail = par.children("td:nth-child(3)"); 

    tdName.html(tdName.children("input[type=text]").val());
    tdPhone.html(tdPhone.children("input[type=text]").val()); 
    tdEmail.html(tdEmail.children("input[type=text]").val()); 

        var maxPrint = 30;
        var x=1;
        event.preventDefault();
        if (x < maxPrint) {
        $('.table tbody').append("<div class=\"display\" ><h6>Contact List</h6><br/>Name : " + tdName.html() + "<br/>" + "Email : " + tdEmail.html() + "<br/>" + "Phone : " + tdPhone.html() + "<br/>" + "<input type='button' value='Delete' id='deletePrint' class=\"btn btn-danger btn-sm\"/>  </div>");
        x++;
        };
        $('.display').on('click' , "#deletePrint" , function(event) {
        event.preventDefault();
        $(this).parent('div').remove();
        x--;
      });
  });  
     

     
     // button edit/save/cancel handler from update value   
   $('.table').on( 'click', '.edit', function (event) {
              var currentTD = $(this).parents('tr').find('td');
              $.each(currentTD , function() {
               $(this).prop("contenteditable" , true);
              });

              $(this).hide();
             $(this).siblings('.save, .cancel').show();
        });

   // $('.table tbody').on( 'click', '.cancel', function (event) {
   //          var currentTD = $(this).parents('tr').find('td');
   //          $.each(currentTD , function() {
   //        $(this).prop("contenteditable" , false);
   //              });
   //              $(this).siblings('.edit').show();
   //              $(this).siblings('.save').hide();
   //              $(this).hide();
   //          });

    $('.table tbody').on( 'click', '.save', function (event) {
        var currentTD = $(this).parents('tr').find('td');
            $.each(currentTD , function() {
          $(this).prop("contenteditable" , false);
                });
                $(this).siblings('.edit').show();
                $(this).siblings('.cancel').hide();
                $(this).hide();
            });

});








