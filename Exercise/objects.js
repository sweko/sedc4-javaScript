/* initial objects
var weko = {
	firstName: "",
	lastName: "",
	age: 0,
	getDisplayText : function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	}
};

weko.firstName = "Wekoslav";
weko.lastName = "Stefanovski";
weko.age = 0x26;


var result = document.getElementById("result");
result.innerHTML = weko.getDisplayText();
*/

/* naive objects
var students = [];

var dimitar = {
	firstName:"Dimitar",
	lastName:"Panovski",
	age: 18,
	getDisplayText : function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	}
};

var riste = {
	firstName :"Riste",
	lastName : "Tegovski",
	age: 0x17,
	getDisplayText : function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	}
};

var dare = {
	firstName: "Darko",
	lastName: "Gjorgjievski",
	age: 0x19,
	getDisplayText : function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	}
};

students.push(dimitar);
students.push(riste);
students.push(dare);

var result = document.getElementById("result");
for (var index = 0; index < students.length; index++) {
	var student = students[index];
	result.innerHTML += student.getDisplayText()+"<br />";
}
*/

/* function constructors
function Student(firstName, lastName, age){
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.getDisplayText = function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	};
}

var dimitar = new Student("Dimitar","Panovski", 18); 
var riste = new Student("Riste", "Tegovski", 0x17);
var dare = new Student("Darko", "Gjorgjievski", 0x19);
var students = [dimitar, riste, dare];

students.push(new Student("Filip","Simonovski", 0x12));

var weko = {
	firstName: "Wekoslav",
	lastName: "Stefanovski",
	age: 0x26,
	getDisplayText : function () {
		return this.firstName + " " + this.lastName + " " + this.age;
	}
};
students.push(weko);

var dummy = {
	getDisplayText : function () {
		return "BATMAN";
	}
};
students.push(dummy);

var result = document.getElementById("result");
for (var index = 0; index < students.length; index++) {
	var student = students[index];
	result.innerHTML += student.getDisplayText()+"<br />";
}
*/

function Student(firstName, lastName, age){
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.getDisplayText = function () {
		return this.firstName + " " + this.lastName + " (" + this.age 
		  + ") from " + this.address.city;
	};
	
	this.toString = this.getDisplayText;
	
	this.grades = [];
	this.address = new Address();
}

function Address(streetName, streetNumber, city){
	this.streetName= streetName;
	this.streetNumber = streetNumber;
	this.city = city;
}

function StudentContainer(){
	var students = [];
	
	this.add = function(student){
		//verify that it is a valid student
		students.push(student);	
	};
	
	this.print = function(result){
		for (var index = 0; index < students.length; index++) {
			var student = students[index];
			result.innerHTML += student +"<br />";
		}
	};
}

var dimitar = new Student("Dimitar","Panovski", 18);
dimitar.grades.push(10);
dimitar.grades.push(50);
dimitar.address.city = "Skopje";
 
var riste = new Student("Riste", "Tegovski", 0x17);
var dare = new Student("Darko", "Gjorgjievski", 0x19);
var students = new StudentContainer();
students.add(dimitar);
students.add(dare);
students.add(riste);

//students.students.push(7);

var result = document.getElementById("result");
students.print(result);

function printInDiv(){
	var span = document.getElementsByTagName("span")[0];
	students.print(span);
}



//students.push(new Student("Filip","Simonovski", 0x12));



