$(function () {

    var areSpansShown = true;
    $("#hideSpans").click(function () {
        areSpansShown = handler(areSpansShown, "span", "#hideSpans", "Spans");
    });
    
    $("#hideSpans").click(function () {
        areSpansShown = handler(areSpansShown, "span", "#hideSpans", "Spans");
    });

    var areDivsShown = true;
    $("#hideDivs").click(function () {
        areDivsShown = handler(areDivsShown, "div", "#hideDivs", "Divs");
    });

    var areBigsShown = true;
    $("#hideBigs").click(function () {
        areBigsShown = handler(areBigsShown, ".big", "#hideBig", "BigOnes");
    });
    
    $("div").click(function(){
        $(this).addClass("dretch");
    });
    
    $(".big").click(function(){
        $(this).addClass("fire");
    });

});


var handler = function (areShown, selector, button, title) {
    if (areShown) {
        areShown = false;
        $(selector).fadeOut();
        $(button).text("Show " + title);
    } else {
        areShown = true;
        $(selector).fadeIn();
        $(button).text("Hide " + title);
    }
    return areShown;
};
    