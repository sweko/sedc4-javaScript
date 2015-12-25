var simulator = {};

simulator.activeJedi = [];
simulator.activeSith = [];

simulator.init = function(){
	var jediColor = document.getElementById("jediColor");
	for (var i = 0; i < simulator.jediColors.length; i++) {
		var color = simulator.jediColors[i];
		var option = document.createElement("option");
		option.value=color;
		option.innerHTML = color;
		jediColor.appendChild(option);
	}
	jediColor.value = '';
	
	var createJedi = document.getElementById("createJedi");
	createJedi.addEventListener("click", function(){
		var name = document.getElementById("jediName").value;
		var power = document.getElementById("jediPower").value;
		var armor = document.getElementById("jediArmor").value;
		var force = document.getElementById("jediForce").value;
		var color = document.getElementById("jediColor").value;
		
		try {
			var jedi = new simulator.Jedi(name, power, armor, force, color);
			simulator.activeJedi.push(jedi);
		} catch (error) {
			alert(error);
		}
		
		document.getElementById("jediName").value = '';
		document.getElementById("jediPower").value = 5;
		document.getElementById("jediArmor").value = 3;
		document.getElementById("jediForce").value = 3;
		document.getElementById("jediColor").value = '';
		
		simulator.displayJedi();
	});
	
	var createSith = document.getElementById("createSith");
	createSith.addEventListener("click", function(){
		var name = document.getElementById("sithName").value;
		var power = document.getElementById("sithPower").value;
		var armor = document.getElementById("sithArmor").value;
		var force = document.getElementById("sithForce").value;
		var anger = document.getElementById("sithAnger").value;
		
		try {
			var sith = new simulator.Sith(name, power, armor, force, anger);
			simulator.activeSith.push(sith);
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
};

simulator.displayJedi = function(){
		
};

simulator.displaySith = function(){
	
};


document.addEventListener('DOMContentLoaded', function(){
	simulator.init();
});