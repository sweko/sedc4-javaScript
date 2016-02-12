$(function () {
    $("#hello").click(function(){
        $("div").extract({
            charCount: 30,
            showLessText:"-",
            showAllText:"+",
            onExpand: function(){
                console.log("expanding");
            }
        }); 
        $("#second").extract({
            beforeExpand: function(){return false;}
        });
    });
});