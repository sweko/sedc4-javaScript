processor.process = function (data, container, callback) {
    if (processor.process.commands == undefined) {
        var regex = /^(turn off|turn on|toggle) ([0-9]{1,3}),([0-9]{1,3}) through ([0-9]{1,3}),([0-9]{1,3})$/gm;
        var match = regex.exec(data);
        processor.process.commands = [];
        while (match) {
            processor.process.commands.push({
                type: match[1],
                left: Number(match[2]),
                top: Number(match[3]),
                right: Number(match[4]),
                bottom: Number(match[5]),
            });
            match = regex.exec(data);
        }
        console.log("loaded " + processor.process.commands.length + " commands");
    }
    if (!processor.process.index) {
        var size = 1000;
        processor.process.lights = [];
        for (var i = 0; i < size; i++) {
            processor.process.lights.push([]);
            for (var j = 0; j < size; j++) {
                processor.process.lights[i].push(false);
            }
        }
        console.log("Initialized lights");    
        processor.process.index = 0;
    }
    innerCall();

    function innerCall() {
        var command = processor.process.commands[processor.process.index];
        operate(command, processor.process.lights);
        var message = "Operation #" + (processor.process.index + 1) + ": currently " + countLigths(processor.process.lights) + " lights are on";
        container.innerHTML = message + "<br/>";
        console.log(message);
        processor.process.index++;
        if (processor.process.index === processor.process.commands.length) {
            callback(countLigths(processor.process.lights));
            processor.process.index = undefined;      
        } else if (!processor.stopped && !processor.paused) {
            setTimeout(function () {
                innerCall();
            }, 0);
        }
    }

    function countLigths(lights) {
        var count = 0;
        for (var i = 0; i < lights.length; i++) {
            var row = lights[i];
            for (var j = 0; j < row.length; j++) {
                var light = row[j];
                if (light)
                    count++;
            }
        }
        return count;
    }

    function operate(command, lights) {
        for (var i = command.top; i <= command.bottom; i++) {
            var row = lights[i];
            for (var j = command.left; j <= command.right; j++) {
                switch (command.type) {
                    case "turn on":
                        row[j] = true;
                        break;
                    case "turn off":
                        row[j] = false;
                        break;
                    case "toggle":
                        row[j] = !row[j];
                        break;
                    default:
                        throw new Error("invalid command type " + command.type);
                }
            }
        }
    }


};