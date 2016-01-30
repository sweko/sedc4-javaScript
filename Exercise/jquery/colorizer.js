
$(function () {
    //$("#second").extract();
    

    $("#hello").click(function () {
        //$("#second").countIds();//1

        //$("div").countIds();//4
        
//         var second = $("#second");
//         var secondId = second.prop("id");
//         console.log(secondId);
// 
//         second.prop("id","third");
//         secondId = second.prop("id");
//         console.log(secondId);
        
        var second = $("#second");
        var secondId = second.id();
        console.log(secondId);

        second.id("third");
        secondId = second.id();
        console.log(secondId);
    });

});

// 
// function showAll() {
//     $("#test").hide();
//     $("#test2").show();
// }
// 
// function showLess() {
//     $("#test").show();
//     $("#test2").hide();
// }