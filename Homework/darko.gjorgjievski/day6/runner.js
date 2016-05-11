var lastCommandCompleted = 0;
var timesRun = 0;
var size = 1000;
var lights = new Array(size).fill(undefined).map(function(){return new Array(size).fill(false);});
console.log("Initialized lights");

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

function clearTimeoutList() {
    for (var i = 0; i < timeoutsList.length; i++) {
        clearTimeout(timeoutsList[i]);
    }
            
    timeoutsList.length = 0;
}

var processor;
var lastOperation = '';

document.addEventListener("DOMContentLoaded", function () {
    var result = document.getElementById("result");
    result.innerHTML = "";
    
    document.getElementById("start").addEventListener("click", function () {
        
        loadScript("day06.js", function () {
            loadInputFile("day06.js", function (data) {
                processor.process(data, result);
            });
        });
    });
    
    document.getElementById("stop").addEventListener("click", function () {
        clearTimeoutList();
        timesRun = 0;
        lights = new Array(size).fill(undefined).map(function(){return new Array(size).fill(false);});
    });
    
    document.getElementById("pause").addEventListener("click", function () {
        clearTimeoutList();
    });
    
});