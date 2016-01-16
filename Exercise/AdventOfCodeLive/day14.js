processor.process = function (data, container, callback) {
    var regex = /^(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds.$/gm;
    var match = regex.exec(data);
    var reindeer = [];
    while (match) {
        reindeer.push({
            name: match[1],
            speed: Number(match[2]),
            burstTime: Number(match[3]),
            restTime: Number(match[4]),
        });
        match = regex.exec(data);
    }
    
    container.innerHTML = JSON.stringify(reindeer);
    
    return "done";
};