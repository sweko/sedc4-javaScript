QUnit.test("numberToWords", function(assert) {
	assert.equal(toWords(1), "One", "One");
	assert.equal(toWords(2), "Two", "Two");
	assert.equal(toWords(10), "Ten", "Ten");
	assert.equal(toWords(11), "Eleven", "11");
	assert.equal(toWords(21), "Twenty one", "21");
	assert.equal(toWords(192), "One hundred ninety two", 192);
	assert.equal(toWords(1187), "One thousand one hundred eighty seven",1187);
	assert.equal(toWords(2000), "Two thousand",2000);
	assert.equal(toWords(21011), "Twenty one thousand eleven",21011);
	assert.equal(toWords(1000000), "One million","Million");
	assert.equal(toWords(12341678), "Twelve million three hundred forty one thousand six hundred seventy eight",12341678);
	assert.equal(toWords(128341000901), "One hundred twenty eight billion three hundred forty one million nine hundred one",128341000901);
	assert.equal(toWords(128341679000), "One hundred twenty eight billion three hundred forty one million six hundred seventy nine thousand",128341679000);
	assert.equal(toWords(128341679901), "One hundred twenty eight billion three hundred forty one million six hundred seventy nine thousand nine hundred one",128341679901);
	assert.equal(toWords(0), "Zero", "Zero");
	assert.equal(toWords(1001001001001), "One billion one million one thousand one", 1001001001001);
});