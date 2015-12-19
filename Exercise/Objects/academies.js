var sedc = new Firm("sedc", "tutunski");
sedc.totalStudents = 120;
sedc.toString = function(){
	return this.title + " - " + this.location + " (" + this.totalStudents + ")";
};

var semos = new Firm("semos", "skopjanka");
semos.totalStudents = 7;
semos.toString = sedc.toString;


allFirms.academies  = [sedc, semos];

allFirms.academies.toString = function(){
	return "Educational Institutions";
};


