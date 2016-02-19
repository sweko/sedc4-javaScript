var simulator = simulator || {};

simulator.Jedi = function(name, power, armor, forceLevel, color){
	if (!name)
		throw new Error("Invalid Jedi name");
		
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
	
	this.attack = function(target){
		var attackPower = this.forceLevel + Math.floor(Math.random() * (this.power+1));
		var damageMade = target.attackFor(attackPower);
		
		return {
            attackPower : attackPower,
            damageMade : damageMade
        };
	};
	
	this.attackFor = function(attackPower){
		var damageMade = attackPower - armor;
		health -= damageMade > 0 ? damageMade : 0;
		if (health <0){
			health = 0;
		}
        return damageMade > 0 ? damageMade : 0;
	};
	
	this.isAlive = function(){
		return (health !== 0);
	};
};

simulator.jediColors = ['blue', 'green', 'purple', 'yellow']; 


simulator.createSelect = function (){

	var inputColor = document.getElementById("jediColor");
	for(var i=0; i <simulator.jediColors.length; i++){
			var option = document.createElement("option");
			
			option.value = simulator.jediColors[i];
			option.innerHTML = simulator.jediColors[i];
			inputColor.appendChild(option);
			
		}
};
	


//simulator.createSelect();