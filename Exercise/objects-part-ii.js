function Firm(title, location, employees) {
	this.title = title;
	this.location = location;
	this.employees = employees;
}

var seavus = new Firm("Seavus", "Tutunski kombinat");

var sedc = new Firm();
sedc.title = "SEDC";
sedc.location = "Tutunski kombinat";
sedc.students = [];
//sedc.employees.push("Weko");

var result = document.getElementById("result");
result.innerHTML = sedc.title + " " + seavus.title;