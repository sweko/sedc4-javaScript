var simulator = simulator || {};
simulator.Jedi = function(name, power, armor, forceLevel, color){
	if (!name)
		throw new Error("Invalid Jedi name");
		
	this.name = name;
	if (power > 10) 
		this.power=10;
	else if (power < 0) 
		this.power = 0;
	else 
		this.power = power;
		
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
		target.attackFor(attackPower);
		
		return attackPower;
	};
	
	this.attackFor = function(attackPower){
		health -= attackPower - armor;
		if (health <0){
			health = 0;
		}
	};
	
	this.isAlive = function(){
		return (health !== 0);
	};
};

simulator.jediColors = ['blue', 'green', 'purple', 'yellow']; 