
    //after document ready
$(function() {
     var id=1;
     var personArray=[];
      var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regNumber = /^\d+$/;
  $("#btnSubmit").click(function(){
      console.log("clicked");
      var person={};
      person.id=id;
      person.name=$("#personName").val();
     
            var email=$("#personEmail").val();
            var mobile=$("#personMobile").val();
      if(regexEmail.test(email)==false)
      {
          $("#personEmail").css("background-color","red");
          return;
      }
      $("#personEmail").css("background-color","white");
     
      
       if(regNumber.test(mobile)==false)
      {
          $("#personMobile").css("background-color","red");
          return;
      }
       $("#personMobile").css("background-color","white");
       
        
      person.email=$("#personEmail").val();
      person.mobile=$("#personMobile").val();
      id++;
      personArray.push(person);
      console.log(person);
      
      
      var table = $("#personTable");
      table.append("<tr id=row-"+person.id+"> <td>"+person.name+"</td>  <td>"+person.email+"</td>  <td>"+person.mobile+
                "</td> <td> <button type='button' class='btn btn-default btnRead' data-personId="+person.id+" >Read</button>"+
                " <button type='button' class='btn btn-success btnUpdate' data-personId="+person.id+" >Update</button>"+ 
                " <button type='button' class='btn btn-danger btnDelete' data-personId="+person.id+" >Delete</button></td>"+"</tr>");
                
      document.getElementById("personForm").reset();
   
        
                
          
  });
  
    $( document ).on( 'click', '.btnDelete', function() {
        var personId=$(this).attr("data-personId");
        console.log("deleteing "+personId);
        $("#row-"+personId).hide();
    });

    $( document ).on( 'click', '.btnUpdate', function() {
        var personId=$(this).attr("data-personId");
         person=personArray[personId-1];
         var row = $("#row-"+personId);
        row.empty();
        row.append("<td><input value="+person.name+" class=input-"+person.id+"></td>"+
                " <td><input value="+person.email+" class=input-"+person.id+"></td> "+
                " <td><input value="+person.mobile+" class=input-"+person.id+"></td>"+
                " <td> <button type='button' class='btn btn-warning btnSave' data-personId="+person.id+" >SAVE</button></td>");
        
    });

    $( document ).on( 'click', '.btnRead', function() {
         var personId=$(this).attr("data-personId");
         person=personArray[personId-1];
        
        
       $("#divRead").show();
        $("#divDetails").empty();
        $("#divDetails").append("name:<b>" +person.name+
                               "</b><br>email:<b>" +person.email+ "</b><br>mobile:<b>" +person.mobile+"</b>");
    });
    
     $( document ).on( 'click', '.btnSave', function() {
         
        var personId=$(this).attr("data-personId");
        
         person=personArray[personId-1];
         
         var row = $("#row-"+personId);
         
         var inputArray = $(".input-"+personId);
         
         
            var mail=inputArray[1].value;
            var tel=inputArray[2].value;
         
            if(regexEmail.test(mail)==false)
                {
                    
                    $(inputArray[1]).css("background-color","red");
                    return;
                }
         $(inputArray[1]).css("background-color","white");
     
      
        if(regNumber.test(tel)==false)
        {
            $(inputArray[2]).css("background-color","red");
            return;
        }
       $(inputArray[2]).css("background-color","white");
        
        person.id=personId;
        person.name=inputArray[0].value;
        person.email=inputArray[1].value;
        person.mobile=inputArray[2].value;
        
        personArray[personId-1]=person;
        
        row.empty();
        row.append("<td>"+person.name+"</td>  <td>"+person.email+"</td>  <td>"+person.mobile+
                "</td> <td> <button type='button' class='btn btn-default btnRead' data-personId="+person.id+" >Read</button>"+
                " <button type='button' class='btn btn-success btnUpdate' data-personId="+person.id+" >Update</button>"+ 
                " <button type='button' class='btn btn-danger btnDelete' data-personId="+person.id+" >Delete</button></td>");
        
        
       
    });
    
      $( document ).on( 'click', 'td', function(e) {
            if(e.target != this)
                return;
            var row=$(this).parent();
            row.css("background-color","#add8e6");
        
        
       
    });
    
       $( document ).on( 'click', '#closeDetails', function() {
           $("#divRead").slideUp( "slow", function() {
                        $("#divRead").hide();
                });
            
        
       
    });
  
 
});