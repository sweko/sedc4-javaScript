var simulator = simulator || {};
simulator.Sith = function(name, power, armor, forceLevel, angerLevel){
	this.name = "Darth "+name;

	this.power = Math.max(0, Math.min(10, power));
	this.armor = Math.max(1, Math.min(5, armor));
	this.forceLevel = Math.max(1, Math.min(5, forceLevel));
	this.angerLevel = Math.max(1, Math.min(10, angerLevel));
	this.color = "red";
	
	var health = 100;
	
	this.getHealth = function(){
		return health;
	};
	
	this.isAlive = function(){
		return (health !== 0);
	};
	
	this.attackFor = function(attackPower){
        var damageMade = attackPower - armor;
		health -= damageMade > 0 ? damageMade : 0;
		if (health < 0){
			health = 0;
		}
        return damageMade;
	};
	
	this.attack = function(target){
		var attackPower = Math.floor(this.forceLevel * (0.8 + this.angerLevel/10) + Math.random() * (this.power+1));
		var damageMade = target.attackFor(attackPower);
		
		return { 
            attackPower : attackPower,
            damageMade : damageMade
        };
	};
};