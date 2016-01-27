/// <reference path="jquery-2.2.0.js" />

function colorDivs(){
    $("div").addClass("dretch");
}



$(function(){
   $("#apply").click(colorDivs);
   
   $(".fire").click(function(){
        $("div").addClass("large");
   });
   
   $(".dull").click(function(){
       var tagName = $("#tag").val();
        $(tagName+".fire").removeClass("large");
   });


});