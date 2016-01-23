(function(){
	var tinex = new Firm("tinex", "kaj tinex");
	tinex.itemCount = 12345;
	var vero = new Firm("vero", "kaj vero");
	vero.itemCount = 23456;
	
	allFirms.groceries = [tinex, vero];
	allFirms.groceries.toString = function(){
		return "Supermarket Chain";
	};
})();