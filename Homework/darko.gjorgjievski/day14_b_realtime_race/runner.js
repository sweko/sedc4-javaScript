var raceSpeed = 10; // how many ms will pass between each race update
var secondsToRace = 2503;

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




loadInputFile("day14.input", function(inputString) {
    var reindeers = parseReindeerDetailsFromString(inputString);
    var table = document.getElementById('reindeers').getElementsByTagName('tbody')[0];
    renderReindeersToTable(reindeers, table);
    assignActiveSecondsToReindeers(reindeers, secondsToRace);
    processEachSecond(secondsToRace, reindeers);
    console.log(getWinningReindeerPoints(reindeers));
});