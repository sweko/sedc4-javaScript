

processor.process = function (data, container, callback) {
      var regex = /^(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds.$/gm;
    var match = regex.exec(data);
    var deerArray = [];
    while (match) {
        deerArray.push({
            name: match[1],
            speed: Number(match[2]),
            runTime: Number(match[3]),
            restTime: Number(match[4])
        });
        match = regex.exec(data);
    }
    console.log("loaded " + deerArray.length + " commands");
    console.log(deerArray);



    var deerArrayLength = deerArray.length;
    var index = 0;
    innerCall(index);

    function innerCall(index) {
        var deer = deerArray[index];
        calculate(deer);
        var message = "Deer with name " + deer.name + " for 2503 seconds ran: "+deer.distance;
        container.innerHTML += message + "<br/>";
        //console.log(message);
        index++;
        if (index === deerArrayLength) {
            callback(findWinner(deerArray));
        } else {
            setTimeout(function () {
                innerCall(index);
            }, 0);
        }
    }

    function findWinner(deerArray) {
        maxDistance=deerArray[0].distance;
        maxDeer=deerArray[0];
        for(i=0; i<deerArray.length; i++){
            if(deerArray[i].distance > maxDistance)
                {
                    maxDeer= deerArray[i];
                    maxDistance=deerArray[i].distance;
                }
        }
        return maxDeer;
    }

    function calculate(deer) {
       distance = 0;
       remainingTime=2503;
       while(remainingTime > 0){
            if(remainingTime > deer.runTime)
            {
                remainingTime -= deer.runTime;
                distance += deer.speed * deer.runTime;
                remainingTime -= deer.restTime;
            }
            else
            {
                distance += deer.speed*remainingTime;
                remainingTime=0;
            }

       }
       deer.distance = distance;
    }


};

processor.process2 = function (data, container, callback) {
      var regex = /^(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds.$/gm;
    var match = regex.exec(data);
    var deerArray = [];
    while (match) {
        deerArray.push({
            name: match[1],
            speed: Number(match[2]),
            runTime: Number(match[3]),
            restTime: Number(match[4]),
            points:0
        });
        match = regex.exec(data);
    }
    console.log("loaded " + deerArray.length + " commands");
   

    var deerArrayLength = deerArray.length;

    for(i=0; i<deerArray.length; i++){
            deerArray[i].runRemeaning = deerArray[i].runTime;
            deerArray[i].restRemeaning = deerArray[i].restTime;
            deerArray[i].distance = 0 ;
        }


        var deerArrayLength = deerArray.length;
        var seconds = 0;
        innerCal(seconds);

    function innerCal(seconds) {
        if(runFlag == true)
        {
            for(j=0; j<deerArray.length; j++){
                var deer =deerArray[j];

                if(deer.runRemeaning > 0){
                    deer.runRemeaning -= 1;
                    deer.distance += deer.speed;
                }
                else if(deer.restRemeaning >0){
                    deer.restRemeaning -= 1;

                    if(deer.restRemeaning==0){
                        deer.runRemeaning = deer.runTime;
                        deer.restRemeaning = deer.restTime;

                    }
                }
           

            }

            addPoints(deerArray); 
                //schedule za pisuvanje vo UI-to na sekoja 10ta sekunda
            if(seconds%10==0)
            {
                var message = seconds +" th second processed!";
                container.getElementsByTagName("span")[0].innerHTML = message + "&nbsp";
                addToTable(deerArray,seconds,container); 
            }
            
            seconds++;  
        }
       
            //povikuvanje na callback i predavanje na najbrz deer
        if (seconds === 2503) {
                var message = seconds +" th second processed!";
                container.getElementsByTagName("span")[0].innerHTML = message + "&nbsp";
                addToTable(deerArray,seconds,container); 
                callback(findWinnerByPoints(deerArray));
        } //pauza pa povikuvanje posle najbrzo mozno vreme so cel da se nacrta UI-to
        else {
            setTimeout(function () {
                innerCal(seconds);
            }, 0);
        }
    }



        //dodavanje poeni na onoj/onie koj e vo vodstvo spored distance
    function addPoints(deerArray) {
        maxDistance=deerArray[0].distance;
        maxDeer=[];

        for(i=0; i<deerArray.length; i++){

            if(deerArray[i].distance == maxDistance)
                maxDeer.push(deerArray[i]);

            if(deerArray[i].distance > maxDistance)
                {
                    maxDeer=[];
                    maxDeer.push(deerArray[i]);
                    maxDistance=deerArray[i].distance;
                }
        }
       for(i=0; i<maxDeer.length; i++)
            maxDeer[i].points+=1;
       
    }
        //naoganje pobednik so najgolemi poeni
     function findWinnerByPoints(deerArray) {
        maxPoints=deerArray[0].points;
        maxDeer=deerArray[0];

        for(i=0; i<deerArray.length; i++){
            if(deerArray[i].points > maxPoints)
                {
                    maxDeer= deerArray[i];
                    maxPoints=deerArray[i].points;
                }
        }
        //console.log(JSON.stringify(deerArray));
         var ind = deerArray.indexOf(maxDeer);
         var td= document.getElementById("deerId-"+ind);
         td.style.backgroundColor = "#80ff80";
        return maxDeer;
    }

            //funkcija za popolnuvanje na tabelata vo UI-to
        function addToTable(deerArray,second,container){
            var table = container.getElementsByTagName("table")[0];
            table.innerHTML="";

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var txt=document.createTextNode("Results in the "+second+" second:"); 
            td.appendChild(txt);
            tr.appendChild(td);
            table.appendChild(tr);

            var tr = document.createElement("tr");
            tr.innerHTML="<th>NAME</th> <th>Distance</th> <th>POINTS</th>"
            table.appendChild(tr);

            for(i=0; i<deerArray.length; i++){

                var deer=deerArray[i];

                var tr = document.createElement("tr");

                var td = document.createElement("td");
                var txt=document.createTextNode(deer.name); 
                td.appendChild(txt);
                tr.appendChild(td);
                

                var td = document.createElement("td");
                var txt=document.createTextNode(deer.distance); 
                td.appendChild(txt);
                tr.appendChild(td);
                

                var td = document.createElement("td");
                var txt=document.createTextNode(deer.points); 
                td.appendChild(txt);
                tr.appendChild(td);
                

                //dodavanje id na redicata
                tr.setAttribute("id","deerId-"+i);
                table.appendChild(tr);
    }

        

    }





};