

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
                distanceTraveled: 0,
                secondsActive: null,
                points: 0
            });
        match = regex.exec(data);
        }   
        
        return reindeers;
    }

// f(32,10) => [[1,10], [11, 20], [21, 30], [31,32]]
function calculateCycleRanges(totalSeconds, oneCycleDuration) {
    var completeCycles = Math.floor(totalSeconds / oneCycleDuration); // 3
    
    // find the end of the whole cycles, i.e. [10, 20, 30]
    wholeCycleEndings = []
    for (var i = 1; i <= completeCycles; i++) {
        var cycleEnding = i * oneCycleDuration
        wholeCycleEndings.push(cycleEnding);
    }
    
    // find the beginning of the whole cycle and merge it with the end
    wholeCycleRanges = [];
    for (var i = 0; i < wholeCycleEndings.length; i++) {
        var cycleStart = wholeCycleEndings[i] - (oneCycleDuration - 1); // find the beginning
        wholeCycleRanges.push([cycleStart, wholeCycleEndings[i]]); // merge it with the end
    }
    
    // now let's find the incomplete cycle range, if any
    var completeCycleSecs = completeCycles * oneCycleDuration; // 30
    var secondsRemaining = totalSeconds - completeCycleSecs;
    if (secondsRemaining === 0) {
        return wholeCycleRanges;
    } else {
        incompleteCycle = [completeCycleSecs + 1, totalSeconds];
        wholeCycleRanges.push(incompleteCycle);
        return wholeCycleRanges;
    }   
}

function createRangeOfNumbers(low, high) {
    var list = [];
    
    for (var i = low; i <= high; i++) {
        list.push(i);
    }
    
    return list;
}


function calculateFlyingSeconds(cycleRangesList, secondsFlying) {
    var flyingSeconds = [];
    // var restingSeconds = []; Since this is a binary decision, I don't need a separate restingSounds array. If it's not flying, then it's resting!
    
    for (var i = 0; i < cycleRangesList.length; i++) {
        var cycleRange = createRangeOfNumbers(cycleRangesList[i][0], cycleRangesList[i][1]);
        
        // since slice() is so flexible, I can use it on both whole and incomplete cycle ranges
        flyingSeconds = flyingSeconds.concat(cycleRange.slice(0, secondsFlying));

    }
    
    return flyingSeconds;
}

function assignActiveSecondsToReindeers(reindeers, totalSeconds) {
    for (var i = 0; i < reindeers.length; i++) {
        r = reindeers[i];
        var oneCycleDuration = r.flyingSeconds + r.restingSeconds;
        
        var cycleRangesList = calculateCycleRanges(totalSeconds, oneCycleDuration);
        var activeSeconds = calculateFlyingSeconds(cycleRangesList, r.flyingSeconds);
        r.secondsActive = activeSeconds;
    }
}

function addToDistanceTraveledIfReindeersAreActive(reindeers, second) {
    for (var i = 0; i < reindeers.length; i++) {
        r = reindeers[i];
        
        if (r.secondsActive.indexOf(second) > -1) { // is reindeer actie in this particular second?
            r.distanceTraveled += r.kms;  
        } 
    }
}

function getReindeersInTheLead(reindeers) {
    var maximumDistance = Math.max.apply(null, reindeers.map(function(o) { return o.distanceTraveled; }));
    
    // find reindeers with this maximum distance
    var reindeersInLead = reindeers.filter(function(o) { if (o.distanceTraveled === maximumDistance) return o; });
    
    return reindeersInLead;
}

function giveOnePointToReindeersInTheLead(reindeersInLead) {
    for (var i = 0; i < reindeersInLead.length; i++) {
        reindeersInLead[i].points += 1;
    }
}

function getReindeerWithMostPoints(reindeers) {
    var allPoints = reindeers.map(function(o) { return o.points; });
    maxPoints = Math.max.apply(null, allPoints);
    
    for (var i = 0; i < reindeers.length; i++) {
        if (reindeers[i].points === maxPoints) {
            return reindeers[i];
        }
    }
}

function renderReindeersToTable(reindeers, table) {
    var reindeerWithMostPoints = getReindeerWithMostPoints(reindeers);
    
    for (var i = 0; i < reindeers.length; i++) {
        var r = reindeers[i];

        var row = table.insertRow(0);
        
        if (r === reindeerWithMostPoints) {
            row.style.fontWeight = 'bold';
        }
        
        var cellName = row.insertCell(0);
        var cellDistance = row.insertCell(1);
        var points = row.insertCell(2);
        
        cellName.innerHTML = r.name;
        cellDistance.innerHTML = r.distanceTraveled;
        points.innerHTML = r.points;                     
    }
}

function reRenderReinddersToTable(reindeers) {
    var newTbody = document.createElement('tbody');
    renderReindeersToTable(reindeers, newTbody);
    var oldTBody = document.getElementById('reindeers').getElementsByTagName('tbody')[0];
    oldTBody.parentNode.replaceChild(newTbody, oldTBody)
}
function processEachSecond(totalSeconds, reindeers) {
    for (var s = 1; s <= totalSeconds; s++) {
        (function() { // introduce block scope with IIFE
            var second = s;
            setTimeout(function() {
            addToDistanceTraveledIfReindeersAreActive(reindeers, second);
            var reindeersInLead = getReindeersInTheLead(reindeers);
            giveOnePointToReindeersInTheLead(reindeersInLead);
            reRenderReinddersToTable(reindeers);
                
            }, second*raceSpeed) // end setTimeout 
        })(); // end IIFE
    } // end for-loop
}

function getWinningReindeerPoints(reindeers) {
    var allPoints = reindeers.map(function(o) { return o.points; });
    return Math.max.apply(null, allPoints);
}


