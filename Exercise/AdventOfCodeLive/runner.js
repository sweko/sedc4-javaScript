
var processor = {};

document.addEventListener("DOMContentLoaded", function () {
    var result = document.getElementById("result");
    var tempResult = document.getElementById("tempResult");
    document.getElementById("start").addEventListener("click", function () {
        result.innerHTML="";
        var dayNumber = document.getElementById("dayNumber").value;
        loadScript("day"+dayNumber+".js", function(){
            loadInputFile("day"+dayNumber+".input", function(data){
                processor.process(data, tempResult, function(out){
                    result.innerHTML +="<b>"+out+"</b>";
                });
                console.log("returned from process");
            });
        });
    });
});

loadScript = function(scriptName, callback){
    var script = document.createElement("script");
    script.src = scriptName;
    document.body.appendChild(script);
    script.onload = function () {
        console.log("script loaded, calling callback");
        callback();
    };
};

loadInputFile = function(fileName, callback){
    var client = new XMLHttpRequest();
    client.open('GET', fileName);
    client.onreadystatechange = function () {
        if (client.readyState === 4 && client.status === 200) {
            console.log("input loaded, calling callback");
            callback(client.responseText);
        }
    };
    client.send();
};




/*
    var client = new XMLHttpRequest();
    client.open('GET', 'day06.input');
    client.onreadystatechange = function () {
        if (client.readyState === 4 && client.status === 200) {
            console.log("input file loaded, calling callback");
            callback(client.responseText);
        }
    };
    client.send();
 */