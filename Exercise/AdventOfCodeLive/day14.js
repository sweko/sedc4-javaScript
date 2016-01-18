processor.process = function (data, container, callback) {
    var regex = /^(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds.$/gm;
    var match = regex.exec(data);
    var reindeers = [];
    while (match) {
        reindeers.push({
            name: match[1],
            speed: Number(match[2]),
            burstTime: Number(match[3]),
            restTime: Number(match[4]),
        });
        match = regex.exec(data);
    }
    
    var time = 2503;
    
    for (var index = 0; index < reindeers.length; index++) {
        var reindeer = reindeers[index];
        
        reindeer.cycleTime = reindeer.burstTime + reindeer.restTime;
        reindeer.cycleDistance = reindeer.burstTime * reindeer.speed;
        
        var completeCycles = Math.floor(time / reindeer.cycleTime);
        var driveTime =  completeCycles * reindeer.cycleTime;

        var restTime = time - driveTime;
       
        var lastCycleDistance;
        if (restTime < reindeer.burstTime){
           lastCycleDistance = restTime * reindeer.speed;
        } else {
            lastCycleDistance = reindeer.burstTime * reindeer.speed;
        }
        
        var totalDistance = reindeer.cycleDistance * completeCycles + lastCycleDistance;
        reindeer.totalDistance = totalDistance;
    }
    container.innerHTML = JSON.stringify(reindeers);
    
    //var distances2 = reindeers.map(function(rd){return rd.totalDistance;});
    
    var distances2 = reindeers.map(rd => rd.totalDistance);
    
    var distances = [];
    for (var index = 0; index < reindeers.length; index++) {
        var reindeer = reindeers[index];
        distances.push(reindeer.totalDistance);
    }
    container.innerHTML += JSON.stringify(distances);
    container.innerHTML += JSON.stringify(distances2);
    
    var maxDistance2 = Math.max.apply(null, distances);
    
    var maxDistance = 0;
    for (var index = 0; index < reindeers.length; index++) {
        var reindeer = reindeers[index];
        if (reindeer.totalDistance > maxDistance)
            maxDistance = reindeer.totalDistance; 
    }
    
    container.innerHTML += JSON.stringify(maxDistance);
    container.innerHTML += JSON.stringify(maxDistance2);
    
    callback(maxDistance);
};