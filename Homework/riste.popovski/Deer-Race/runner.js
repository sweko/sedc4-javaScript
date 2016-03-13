
var processor = {};
runFlag=true;

document.addEventListener("DOMContentLoaded", function () {
    var result = document.getElementById("result");
    var tempResult = document.getElementById("tempResult");
     var result2 = document.getElementById("result2");
    var tempResult2 = document.getElementById("tempResult2");
    var btnDiv = document.getElementById("btnDiv");
    var table = document.getElementById("tableResult");
    document.getElementById("start").addEventListener("click", function () {

       table.innerHTML="";
       result2.innerHTML="";
       result.innerHTML="";
       btnDiv.innerHTML="";
       tempResult.innerHTML="<strong>OLD SYSTEM</strong> <br>";

       initButtons(btnDiv);
       
        loadScript("day14.js", function(){
            loadInputFile("day14.txt", function(data){
                processor.process(data, tempResult, function(out){
                    result.innerHTML +="<b>"+"Fastest deer is: "+out.name+" with distance:"+ out.distance+" </b>";
                });
                 processor.process2(data, tempResult2, function(out){
                     result2.innerHTML +="<b>"+"MostPoints deer is: "+out.name+" with points:"+ out.points+" </b>";
                  
                  
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

initButtons = function(btnDiv){
        console.log("btn Initialized");
        var btn = document.createElement("button");
        btn.className="btn btn-warning";
        btn.innerHTML="STOP";
        btn.addEventListener("click",function(){
            runFlag=false;
        })
        btnDiv.appendChild(btn);

        var btn = document.createElement("button");
        btn.className="btn btn-success";
        btn.innerHTML="CONTINUE";
        btn.addEventListener("click",function(){
            runFlag=true;
        })
        btnDiv.appendChild(btn);
}



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