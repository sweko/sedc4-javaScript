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
        
        var size = 1000;
        var lights = new Array(size).fill(undefined).map(function(){return new Array(size).fill(false);});
        
        console.log("Initialized lights");
        
        var comLength = commands.length;
        for (var index = 0; index < comLength; index++) {
            var command = commands[index];
            operate(command, lights);
            container.innerHTML +="Operation #"+ (index+1)+": currently "+ lights.countLigths() +" lights are on <br/>";
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