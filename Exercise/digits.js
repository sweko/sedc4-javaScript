do{
	var number = Number(prompt("Enter number:"));
}while (isNaN(number))

var digits=[];

while (number != 0){
	digits.push(number % 10);
	number = parseInt(number / 10)
}

