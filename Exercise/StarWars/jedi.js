var simulator = simulator || {};

simulator.Jedi = function(name, power, armor, forceLevel, color){
	this.name = name;
	
	this.power = Math.max(1, Math.min(10, power));	
	this.armor = Math.max(1, Math.min(5, armor));
	this.forceLevel = Math.max(1, Math.min(5, forceLevel));
	
	var isValidColor = false;
	for (var index = 0; index < simulator.jediColors.length; index++) {
		var validColor = simulator.jediColors[index];
		if (color === validColor)
			isValidColor = true;
	}

	if (!isValidColor){
		throw new Error(color +" is not a valid lightsabre color for a jedi");
	}
	
	this.color = color;
	
	var health = 100;
	
	this.getHealth = function(){
		return health;
	};
};

simulator.jediColors = ['blue', 'green', 'purple', 'yellow']; 


simulator.createSelect = function (){

	var inputColor = document.getElementById("selectColor");
	for(var i=0; i <simulator.jediColors.length; i++){
			var option = document.createElement("option");
			
			option.value = simulator.jediColors[i];
			option.innerHTML = simulator.jediColors[i];
			inputColor.appendChild(option);
			
		}
}
var createJediButton = document.getElementById("createJedi");
createJediButton.addEventListener("click", function(){
	var inputName = document.getElementById("inName").value;
	var inputArmor = document.getElementById("inArmor").value;
	var inputPower = document.getElementById("inPower").value;
	var inputForceLevel = document.getElementById("inForceLevel").value;
	var inputColor = document.getElementById("selectColor").value;
	
	
	var jedaj4e = new simulator.Jedi(inputName,inputPower,inputArmor,inputForceLevel,inputColor);
	jediArmy.push(jedaj4e);
	console.log(jediArmy);
	
	});
	


simulator.createSelect();
