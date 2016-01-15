var simulator = {};

simulator.ForceManContainer = function() {
    var container = [];
    this.add = function(forceMan) {
        container.push(forceMan);
    }
    this.get = function(index) {
        return container[index];
    }
    this.countAll = function() {
        return container.length;
    };
    this.getAliveMen = function() {
        return container.filter(function(forceMan) {
            return forceMan.isAlive();
        });
    };
    this.getDeadMen = function() {
        return container.filter(function(forceMan) {
            return !forceMan.isAlive();
        });
    };
    
    this.allMen = container;
};

simulator.activeJedi = new simulator.ForceManContainer();
simulator.activeSith = new simulator.ForceManContainer();

simulator.init = function(){
	var jediColor = document.getElementById("jediColor");
	for (var i = 0; i < simulator.jediColors.length; i++) {
		var color = simulator.jediColors[i];
		var option = document.createElement("option");
		option.value=color;
		option.innerHTML = color;
		jediColor.appendChild(option);
	}
	//jediColor.value = '';
	
	var createJedi = document.getElementById("createJedi");
	createJedi.addEventListener("click", function(){
		var name = document.getElementById("jediName").value;
		var power = document.getElementById("jediPower").valueAsNumber;
		var armor = document.getElementById("jediArmor").valueAsNumber;
		var force = document.getElementById("jediForce").valueAsNumber;
		var color = document.getElementById("jediColor").value;
		
		try {
			var jedi = new simulator.Jedi(name, power, armor, force, color);
			simulator.activeJedi.add(jedi);
		} catch (error) {
			alert(error);
		}
		
		document.getElementById("jediName").value = '';
		document.getElementById("jediPower").value = 5;
		document.getElementById("jediArmor").value = 3;
		document.getElementById("jediForce").value = 3;
		//document.getElementById("jediColor").value = '';
		
		simulator.displayJedi();
	});
	
	var createSith = document.getElementById("createSith");
	createSith.addEventListener("click", function(){
		var name = document.getElementById("sithName").value;
		var power = document.getElementById("sithPower").valueAsNumber;
		var armor = document.getElementById("sithArmor").valueAsNumber;
		var force = document.getElementById("sithForce").valueAsNumber;
		var anger = document.getElementById("sithAnger").valueAsNumber;
		
		try {
			var sith = new simulator.Sith(name, power, armor, force, anger);
			simulator.activeSith.add(sith);
		} catch (error) {
			alert(error);
		}
		
		document.getElementById("sithName").value = '';
		document.getElementById("sithPower").value = 5;
		document.getElementById("sithArmor").value = 3;
		document.getElementById("sithForce").value = 3;
		document.getElementById("sithAnger").value = 5;
		
		simulator.displaySith();
	});
	
	var jediAttack = document.getElementById("jediAttack");
	jediAttack.addEventListener("click", simulator.handlers.jediAttack);

	var sithAttack = document.getElementById("sithAttack");
	sithAttack.addEventListener("click", simulator.handlers.sithAttack);
	
	var battle = document.getElementById("battle");
	battle.addEventListener("click", simulator.handlers.battle);

};

simulator.displayJedi = function(){
	var jediList = document.getElementById("jediList");
	jediList.innerHTML = '';
    var aliveJedi = simulator.activeJedi.getAliveMen();  
	for (var i = 0; i < aliveJedi.length; i++) {
		var jedi = aliveJedi[i];
		var tr = jediList.insertRow();
		var td = tr.insertCell();
		td.innerHTML = jedi.name;
		td = tr.insertCell();
		td.innerHTML = jedi.getHealth();
	}
    
    var deadJedi = simulator.activeJedi.getDeadMen();
    for (var i = 0; i < deadJedi.length; i++) {
		jedi = deadJedi[i];
		tr = jediList.insertRow();
		td = tr.insertCell();
		td.innerHTML =  "&capdot;<del>" + jedi.name+"</del>";
		td = tr.insertCell();
		td.innerHTML = jedi.getHealth();
	}
};

simulator.displaySith = function(){
	var sithList = document.getElementById("sithList");
	sithList.innerHTML = '';
	for (var i = 0; i < simulator.activeSith.countAll(); i++) {
		var sith = simulator.activeSith.get(i);
		var tr = sithList.insertRow();
		var td = tr.insertCell();
		td.innerHTML = (sith.isAlive()) ? sith.name : "&capdot;<del>" + sith.name+"</del>";
		td = tr.insertCell();
		td.innerHTML = sith.getHealth();
	}
};

document.addEventListener('DOMContentLoaded', function(){
	simulator.init();
});

simulator.handlers = {};

simulator.handlers.jediAttack = function(){
	var fighters = simulator.getJediAndSith();
	
	var attackResult = fighters.jedi.attack(fighters.sith);
	simulator.displaySith();
	var simConsole = document.getElementById("simconsole");
	simConsole.innerHTML += fighters.jedi.name + " hit " + fighters.sith.name + " with "+ attackResult.attackPower + " power "
                            + " and made "+ attackResult.damageMade +" damage.<br/>"; 
};

simulator.handlers.sithAttack = function(){
	var fighters = simulator.getJediAndSith();
	
	var attackResult = fighters.sith.attack(fighters.jedi);
	simulator.displayJedi();
	var simConsole = document.getElementById("simconsole");
	simConsole.innerHTML += fighters.sith.name + " hit " + fighters.jedi.name + " with "+ attackResult.attackPower + " power "
                            + " and made "+ attackResult.damageMade +" damage.<br/>";
};

simulator.handlers.battle = function(){
	simulator.handlers.jediAttack();
    if (simulator.activeSith.getAliveMen().length > 0) {
	   simulator.handlers.sithAttack();
    }
	
	if (simulator.getJediAndSith())
		setTimeout(simulator.handlers.battle, 400);
	else	
	{
		var simConsole = document.getElementById("simconsole");

		var aliveJedi = simulator.activeJedi.getAliveMen();
	
		if (aliveJedi.length === 0){
			simConsole.innerHTML += "<b>THE SITH WON. THE EMPIRE RULES THE GALAXY WITH AN IRON FIST</b>";
		} else {
			simConsole.innerHTML += "<b>THE JEDI WON. ORDER IS RESTORED TO THE REPUBLIC</b>";
		}
	}
};

simulator.getJediAndSith = function(){
	var aliveJedi = simulator.activeJedi.getAliveMen();
	
	if (aliveJedi.length === 0){
		console.log("The jedi are all dead");
		return null;
	}
	
	var jediIndex = Math.floor(Math.random() * aliveJedi.length);
	var jedi = aliveJedi[jediIndex];

	var aliveSith = simulator.activeSith.getAliveMen();
	
	if (aliveSith.length === 0){
		console.log("The sith are all dead");
		return null;
	}
	
	var sithIndex = Math.floor(Math.random() * aliveSith.length);
	var sith = aliveSith[sithIndex];	
	return {
		jedi: jedi,
		sith: sith
	};
};