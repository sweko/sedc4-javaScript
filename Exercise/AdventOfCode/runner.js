function loadScript(file, callback) {
    var script = document.createElement("script");
    script.src = file;
    document.body.appendChild(script);
    script.onload = function () {
        console.log("script loaded, calling callback");
        callback();
    };
}

function loadInputFile(input, callback) {
    var client = new XMLHttpRequest();
    client.open('GET', 'day06.input');
    client.onreadystatechange = function () {
        if (client.readyState === 4 && client.status === 200) {
            console.log("input file loaded, calling callback");
            callback(client.responseText);
        }
    };
    client.send();
}

var processor;


document.addEventListener("DOMContentLoaded", function () {
    var result = document.getElementById("result");
    result.innerHTML="";
    document.getElementById("start").addEventListener("click", function () {
        loadScript("day06.js", function () {
            loadInputFile("day06.js", function (data) {
                processor.process(data, result);
            });
        });
    });
});