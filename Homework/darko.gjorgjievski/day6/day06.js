var timeoutsList = []; // where we hold all timeouts
var timerIncrementer = 0; // this is so when I click on 'pause' and 'start' again, and I'm on the 4th iteration, the timer will wait 4 secs before beginning (I've used iterationInde * someMsTime to calculate the setTimeout duration). Using a variable like timerIncrementer, this problem will not happen

(function(){
    
    Array.prototype.countLigths = function(){
        var count = 0;
        var length = this.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length; j++) {
                if (this[i][j]) 
                    count++;
            }
        }
        return count;
    };

    
    var process = function (input, container){
        var regex = /^(.*) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})$/gm;
        var match = regex.exec(input);
        var commands = [];
        while (match){
            commands.push({
                type:match[1],
                left: Number(match[2]),
                top: Number(match[3]),
                right: Number(match[4]),
                bottom: Number(match[5]),
            });
            match = regex.exec(input);
        }
        console.log("loaded "+commands.length+" commands");
        

        
        
        
        var comLength = commands.length; // is this some hint for implementing 'pause' ?
        
        for (var lastCommandCompleted = timesRun; lastCommandCompleted < comLength; lastCommandCompleted++) {
            (function() { // introduce block scope
                var indexClone = lastCommandCompleted; // an index in a loop does not have block scope
                var command = commands[lastCommandCompleted];
                timerIncrementer = timerIncrementer + 500;
                var currentTimeout = setTimeout(function() {
                    operate(command, lights);
                    container.innerHTML +="Operation #"+ (indexClone+1)+": currently "+ lights.countLigths() +" lights are on <br/>";
                    timesRun = timesRun + 1;
                    console.log(timesRun);
            }, timerIncrementer);
                timeoutsList.push(currentTimeout);
            })();
        }
        console.log("operated the commands");
        return lights.countLigths();
    };
    
    var operations = {
        'turn on': function(){return true;},
        'turn off': function(){return false;},
        'toggle': function(light){return !light;},
    };
    
    var operate = function (command, lights){
        //var count = 0;
        for (var i = command.left; i <= command.right; i++) {
            for (var j = command.top; j <= command.bottom; j++) {
                lights[i][j] = operations[command.type](lights[i][j]);
            }
        }
        //console.log("toggled "+count+" things");
    };
    
    processor = {
        process:process
    };
})();