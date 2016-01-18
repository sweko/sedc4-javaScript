processor.process = function (data, container, callback) {
    var regex = /^(turn off|turn on|toggle) ([0-9]{1,3}),([0-9]{1,3}) through ([0-9]{1,3}),([0-9]{1,3})$/gm;
    var match = regex.exec(data);
    var commands = [];
    while (match) {
        commands.push({
            type: match[1],
            left: Number(match[2]),
            top: Number(match[3]),
            right: Number(match[4]),
            bottom: Number(match[5]),
        });
        match = regex.exec(data);
    }
    console.log("loaded " + commands.length + " commands");

    var size = 1000;

    var lights = [];
    for (var i = 0; i < size; i++) {
        lights.push([]);
        for (var j = 0; j < size; j++) {
            lights[i].push(false);
        }
    }

    console.log("Initialized lights");

    var comLength = commands.length;
    var index = 0;
    innerCall(index);

    function innerCall(index) {
        var command = commands[index];
        operate(command, lights);
        var message = "Operation #" + (index + 1) + ": currently " + countLigths(lights) + " lights are on";
        container.innerHTML = message + "<br/>";
        console.log(message);
        index++;
        if (index === comLength) {
            callback(countLigths(lights));
        } else {
            setTimeout(function () {
                innerCall(index);
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
            for (var j = command.left; j < command.right; j++) {
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