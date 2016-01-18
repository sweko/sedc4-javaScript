processor.process = function (data, container, callback) {
    var regex = /^(.*) can fly ([0-9]{1,2}) km\/s for ([0-9]{1,2}) seconds, but then must rest for ([0-9]{1,3}) seconds\.$/gm;
    var match = regex.exec(data);
    var reindeers = [];
    while (match) {
        reindeers.push({
            name: match[1],
            speed: Number(match[2]),
            activeTime: Number(match[3]),
            passiveTime: Number(match[4])
        });
        match = regex.exec(data);
    }
    console.log("loaded " + reindeers.length + " commands");
    var time = 2503;
    
    for (var i = 0; i < reindeers.length; i++) {
        var reindeer = reindeers[i];
        
        reindeer.cycleTime = reindeer.activeTime + reindeer.passiveTime;
        reindeer.cycleDistance = reindeer.activeTime * reindeer.speed;
        
        var completeCycles = Math.floor(time / reindeer.cycleTime);
        var completeCyclesTime = completeCycles * reindeer.cycleTime;
        var restTime = time - completeCyclesTime;
        
        var lastCycleDistance;
        if (restTime < reindeer.activeTime) {
            lastCycleDistance = restTime * reindeer.speed;
        } else {
            lastCycleDistance = reindeer.activeTime * reindeer.speed;
        }
        reindeer.totalDistance = reindeer.cycleDistance * completeCycles + lastCycleDistance;
    }
    
    container.innerHTML = (JSON.stringify(reindeers));

    // var distances = reindeers.map(function(rd) {
    //     return rd.totalDistance;
    // });
    //Same as previous one but not yet applied in js
    var distances = reindeers.map(rd => rd.totalDistance);
    
    var maxDistance = Math.max.apply(null,distances); 
    callback(maxDistance);

// 
//     var comLength = commands.length;
//     var index = 0;
//     innerCall(index);
// 
//     function innerCall(index) {
//         var command = commands[index];
//         operate(command, lights);
//         var message = "Operation #" + (index + 1) + ": currently " + countLigths(lights) + " lights are on";
//         container.innerHTML = message + "<br/>";
//         console.log(message);
//         index++;
//         if (index === comLength) {
//             callback(countLigths(lights));
//         } else {
//             setTimeout(function () {
//                 innerCall(index);
//             }, 0);
//         }
//     }
// 
//     function countLigths(lights) {
//         var count = 0;
//         for (var i = 0; i < lights.length; i++) {
//             var row = lights[i];
//             for (var j = 0; j < row.length; j++) {
//                 var light = row[j];
//                 if (light)
//                     count++;
//             }
//         }
//         return count;
//     }
// 
//     function operate(command, lights) {
//         for (var i = command.top; i <= command.bottom; i++) {
//             var row = lights[i];
//             for (var j = command.left; j < command.right; j++) {
//                 switch (command.type) {
//                     case "turn on":
//                         row[j] = true;
//                         break;
//                     case "turn off":
//                         row[j] = false;
//                         break;
//                     case "toggle":
//                         row[j] = !row[j];
//                         break;
//                     default:
//                         throw new Error("invalid command type " + command.type);
//                 }
//             }
//         }
//     }


};