
$(function () {
    //$("#second").extract();
    
    $.fn.helloWorld = function () {
        for (var index = 0; index < this.length; index++) {
            var element = this[index];
            console.log(element.innerHTML);
        }
        return this;
    };

    $("#hello").click(function () {
        $("#second").countIds();
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