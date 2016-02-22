$(document).ready(function(){
    

$("#submitButton").click(function(){
    addEntry();
    
});

var clearInput = function(){
    $("#name").val("");
    $("#email").val("");
    $("#mobileNumber").val("");
}

var id = 0;
var clickedId = 0;

function addEntry(){
    
    id++;
    var name = $("#name").val();
    var email = $("#email").val();
    var mobileNumber = $("#mobileNumber").val();
    clearInput();
    var row = $("<tr>").addClass("rowStyle");
    $("#tableList").append(row);
    //adding rows
    row.append("<td class='name' id='inputArea' data-id="+id+">" + name + "</td>");
    row.append("<td class='email' id='inputArea' data-id='"+id+"'>" + email + "</td>");
    row.append("<td class='mobileNumber' id='inputArea' data-id='"+id+"'>" + mobileNumber + "</td>");
    //buttons
    var readBtn = $("<button class='btn btn-secondary readBtn' id='readBtn'>"+ "Read" +"</button>");
    var deleteBtn = $("<button class='btn btn-danger' id='deleteBtn'>" + "Delete" + "</button>");
    var updateBtn = $("<button class='btn btn-primary' id='updateBtn'>" + "Update" + "</button>");
    $("<td id='about'>").appendTo(row).append(readBtn).append(deleteBtn).append(updateBtn);
    //color rows(bonus)
    $("td#inputArea").click(function(){
        $("td#inputArea").css("background-color","#00CCFF");
    });
   
   
    readBtn.click(function(){ // update button function
        
        $("#display").html("Name: " + name+"<br/>" + "Email: "+ email+"<br/>" + "Mobile Number:" + mobileNumber);
       
        var closeBtn = $("<button class='btn btn-secondary' id='closeBtn'>" + "Close" + "</button>");
        readBtn.hide();
        $(this).closest("td").append(closeBtn);
        readBtn.hide();
        closeBtn.click(function(){
            $("#display").text("");
            closeBtn.hide();
            readBtn.show();
            });
        });
        
        
    var cell = row.append("<td>");
   
    updateBtn.click(function () { // update button function
        var clickedChild = $(this).closest("tr").children()[0];
        clickedId = $(clickedChild).attr("data-id");
            $(this).closest("tr").children("td[data-id=" + clickedId + "]").text("");
             $(this).closest("tr").children("td[class='name']").append("<input class='editName form-control form-control-md'></input>");
             $(this).closest("tr").children("td[class='email']").append("<input type='email' class='editEmail form-control form-control-md'></input>");
             $(this).closest("tr").children("td[class='mobileNumber']").append("<input class='editNumber form-control form-control-md'></input>");
             $(this).closest("tr").children("td").children(".editName").val(name);
             $(this).closest("tr").children("td").children(".editEmail").val(email);
             $(this).closest("tr").children("td").children(".editNumber").val(mobileNumber);
             var saveBtn = $("<button class='btn btn-primary' id='saveBtn'>" + "Save" + "</button>");
             updateBtn.hide();
             $(this).closest("td").append(saveBtn);
             saveBtn.click(function(){ // save button function
                 var editName = $(this).closest("tr").children("td").children(".editName").val();
                 var editEmail = $(this).closest("tr").children("td").children(".editEmail").val();
                 var editNumber = $(this).closest("tr").children("td").children(".editNumber").val();
               
                 $(this).closest("tr").children("td[class='name']").text(editName);
                 $(this).closest("tr").children("td[class='email']").text(editEmail);
                 $(this).closest("tr").children("td[class='mobileNumber']").text(editNumber);
                 
                 name = editName;
                 email = editEmail;
                 mobileNumber = editNumber;
                 
                 saveBtn.hide();
                 updateBtn.show();
             });
    });
    
    deleteBtn.click(function(){ // delete button function
        $(this).closest("tr").hide();
    })
    
     
    
};
});