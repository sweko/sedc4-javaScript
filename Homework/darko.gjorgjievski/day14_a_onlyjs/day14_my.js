var r;

// (function(o) {
        var inputString = "Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.\nCupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds.\nRudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds.\nDonner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds.\nDasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds.\nBlitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.\nPrancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds.\nComet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.\nVixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.";
    function parseReindeerDetailsFromString(data) {
        var regex = /^(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds.$/gm;
        var match = regex.exec(data);
        var reindeers = [];
        while (match) {
            reindeers.push({
                name: match[1],
                kms: Number(match[2]),
                flyingSeconds: Number(match[3]),
                restingSeconds: Number(match[4]),
                distanceTraveled: 0
            });
        match = regex.exec(data);
        }   
        
        return reindeers;
    }
    
    function calculateTraveledDistanceForReindeer(r, totalSeconds) {
        var oneCycleDuration = r.flyingSeconds + r.restingSeconds;
        var distanceTraveledPerCycle = r.kms * r.flyingSeconds;
        
        var completeCycles = Math.floor(totalSeconds / oneCycleDuration);
        var distanceTraveledForCompleteCycles = completeCycles * distanceTraveledPerCycle;
        
        var secondsLeft = totalSeconds - (completeCycles * oneCycleDuration);
        var haveFullFlyingSeconds = (secondsLeft > r.flyingSeconds);
        
        if (haveFullFlyingSeconds) {
            return distanceTraveledForCompleteCycles + distanceTraveledPerCycle;
        } else {
            return distanceTraveledForCompleteCycles + (secondsLeft * r.kms);
        }    
    }
        
    
    
    function calculateDistanceTraveledForReindeers(reindeers, totalSeconds) {
        for (var i = 0; i < reindeers.length; i++) {
            var reindeer = reindeers[i];
            
            reindeer.distanceTraveled = calculateTraveledDistanceForReindeer(reindeer, totalSeconds)
        }
    }
    
    function getMaximumDistanceTraveledFromReindeersList(reindeers) {
        var distances = reindeers.map(function(r) { return r.distanceTraveled });
        return Math.max.apply(null, distances);
    }
    var reindeers = parseReindeerDetailsFromString(inputString);
    calculateDistanceTraveledForReindeers(reindeers, 2503);
    console.log(getMaximumDistanceTraveledFromReindeersList(reindeers));
console.log(reindeers);
// })(r);

