var processor = {};
processor.stopped = true;
processor.paused = false;

document.addEventListener("DOMContentLoaded", function () {
    var result = document.getElementById("result");
    var tempResult = document.getElementById("tempResult");
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", function () {
        processor.stopped = !processor.stopped;
        if (processor.stopped) {
            startButton.textContent = 'Start Processing';
            pauseButton.textContent = 'Pause Processing';
            processor.paused = false;
            processor.process.index = undefined;
            result.innerHTML = 'Processing stopped by the user!';
            
        } else {
            var dayNumber = document.getElementById('dayNumber').value;
            startButton.textContent = 'Stop Processing';
            result.innerHTML="Currently proccessing...";
            loadScript("js/day" + dayNumber + ".js", function(){
                loadInputFile("day" + dayNumber + ".input", function(data) {
                    doProccessing(data);
                });
            });
        }
    });
    
    var doProccessing = function(data) {
                    processor.process(data, tempResult, function(out){
                        result.innerHTML ="<b>"+out+"</b>";
                        processor.stopped = true;
                        document.getElementById("start").textContent = 'Start Processing';
                    });
                    console.log("returned from process");
                };
    
    var pauseButton = document.getElementById('pause');
    pauseButton.addEventListener("click", function () {
        if (processor.stopped) {
            result.textContent = 'Can not pause not started proccess!';
        } else {
            processor.paused = !processor.paused;
            if (processor.paused) {
                pauseButton.textContent = 'Continue Processing';
                result.innerHTML="Currently paused!";
            } else {
                pauseButton.textContent = 'Pause Processing';
                result.innerHTML="Currently processing...";
                doProccessing(null);//we call with null for data parrameter because is already read.
            }
        }
    });
});

var loadScript = function(scriptName, callback){
    var script = document.createElement("script");
    script.src = scriptName;
    document.body.appendChild(script);
    script.onload = function () {
        console.log("script loaded, calling callback");
        callback();
    };
};

var loadInputFile = function(fileName, callback){
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