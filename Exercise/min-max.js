var entries = []; 
do {
	var number = prompt("enter number");
	number = parseInt(number);
	if (number){
		entries.push(number);
	}
} while (number !== 0);

if (entries.length === 0){
	document.writeln("No numbers entered");
} else {
	var max = entries[0];
	var min = entries[0];
	for (var index = 1; index < entries.length; index++) {
		var element = entries[index];
		if (element > max){
			max = element;
		}
		if (element < min){
			min = element;
		}
	}
	document.writeln("Greatest number is "+max + "<br/>");
	document.writeln("Smallest number is "+min + "<br/>");
}