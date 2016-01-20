processor.process = function (data, container, callback) {
    var regex = /^(.*) can fly ([0-9]{1,2}) km\/s for ([0-9]{1,2}) seconds, but then must rest for ([0-9]{1,3}) seconds\.$/gm;
    var match = regex.exec(data);
    var reindeers = [];
    while (match) {
        reindeers.push({
            name: match[1],
            speed: Number(match[2]),
            activeTime: Number(match[3]),
            passiveTime: Number(match[4]),
            points: 0
        });
        match = regex.exec(data);
    }
    console.log("loaded " + reindeers.length + " commands");
    var time = 2503;
  
    innerCall();
    callback('maxDistance: ' + processor.process.maxDistance + ' maxPoints: ' + processor.process.maxPoints);
    
    function innerCall() {
        for (var seconds = 1; seconds <= time; seconds++) {
            for (var i = 0; i < reindeers.length; i++) {
                var reindeer = reindeers[i];
                reindeer.cycleTime = reindeer.activeTime + reindeer.passiveTime;
                reindeer.cycleDistance = reindeer.activeTime * reindeer.speed;
                
                var completeCycles = Math.floor(seconds / reindeer.cycleTime);
                var completeCyclesTime = completeCycles * reindeer.cycleTime;
                var restTime = seconds - completeCyclesTime;
                
                var lastCycleDistance;
                if (restTime < reindeer.activeTime) {
                    lastCycleDistance = restTime * reindeer.speed;
                } else {
                    lastCycleDistance = reindeer.activeTime * reindeer.speed;
                }
                reindeer.totalDistance = reindeer.cycleDistance * completeCycles + lastCycleDistance;
            }
            
            var distances = reindeers.map(rd => rd.totalDistance);       
            var maxDistance = Math.max.apply(null, distances);
            if (seconds == time) {
                processor.process.maxDistance = maxDistance;
            }
            for (var i = 0; i < reindeers.length; i++) {
                reindeer = reindeers[i];
                if (reindeer.totalDistance === maxDistance) {
                    reindeer.points++;
                }   
            }
        }
        var points = reindeers.map(function(rd) {
            return rd.points;
        });
        processor.process.maxPoints = Math.max.apply(null, points);
    }
    
};