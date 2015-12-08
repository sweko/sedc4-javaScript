(function () {
	var convertButton = document.querySelector("#convertButton");
	convertButton.onclick = function() {
		var input = document.getElementById("inputNumber");
		var inputNumber = input.value.trim();
		var result = toWords(inputNumber);
		var output = document.getElementById("result");
		output.textContent = result;
		var macedonianOutput = document.getElementById("macedonianResult");
		macedonianOutput.textContent = toMacedonianWords(inputNumber);
	};
})();

function toWords(number) {
	var result;
	number = Number(number);
	if ((isNaN(number)) || (number < 1) || (number > 999999999999)) {
		result = 'Invalid input!';
	}
	else {		
		result = chunk(number)
			.map(inEnglish)
			.map(appendScale)
			.filter(isTruthy)
			.reverse()
			.join(" ");
	}
	return result;
	
	//inEnglish will return a false'y for the number zero. 
	//That's why I'm using Array.filter to remove false'y values before I join the array. 
	//For instance, the number 300 is (through some recursion) more or less constructed as [ ONE_TO_NINETEEN[3-1], "hundred", TENS[0-1], ONE_TO_NINETEEN[0-1] ]. 
	//This'll become ["three", "hundred", undefined, undefined], so we can't just join that because we'd get some trailing nonsense. 
	//So the undefined values are removed before joining.
	function inEnglish(number) {
		var result = '';	
		var hundreds, tens, ones, words = [];
		var ONE_TO_NINETEEN = [
			"one", "two", "three", "four", "five",
			"six", "seven", "eight", "nine", "ten",
			"eleven", "twelve", "thirteen", "fourteen", "fifteen",
			"sixteen", "seventeen", "eighteen", "nineteen"];
		var TENS = ["ten", "twenty", "thirty", "forty", "fifty",
			"sixty", "seventy", "eighty", "ninety"];
		if (number < 20) {
			result = ONE_TO_NINETEEN[number - 1];
		}
		else if (number < 100) {
			ones = number % 10;
			tens = Math.floor(number / 10);
			words.push(TENS[tens - 1]);
			words.push(ONE_TO_NINETEEN[ones - 1]);
			result = words.filter(isTruthy).join("-");
		}
		else {
			hundreds = Math.floor(number / 100);
			words.push(inEnglish(hundreds));
			words.push("hundred");
			words.push(inEnglish(number % 100));	
			result = words.filter(isTruthy).join(" ");
		}
		return result;	
	}
	
	function appendScale(chunk, exp) {
		var result = '';
		if (!chunk) {
			result = null;
		}
		else {
			var SCALES = ["thousand", "million", "billion"];
			var scale = SCALES[exp - 1];
			result = [chunk, scale].filter(isTruthy).join(" "); 
		}
		return result;
	}
}

function isTruthy(item) {
	return !!item;
}

function chunk(number) {
	var thousands = [];
	while (number > 0) {
		thousands.push(number % 1000);
		number = Math.floor(number / 1000);
	}
	return thousands;
}

function toMacedonianWords(number) {
	var result;
	number = Number(number);
	if ((isNaN(number)) || (number < 1) || (number > 999999999999)) {
		result = 'Invalid input!';
	}
	else {		
		result = chunk(number)
			.map(inMacedonian)
			.map(appendMacedonianScale)
			.filter(isTruthy)
			.reverse()
			.join(" ");
	}
	return result;
	
	function appendMacedonianScale(chunk, exp) {
		var result = '';
		if (!chunk) {
			result = null;
		}
		else {
			var chunkScaleObject = processMacedonianChunks(chunk, exp);
			result = [chunkScaleObject.chunk, chunkScaleObject.scale].filter(isTruthy).join(" "); 
		}
		return result;
		
		function processMacedonianChunks(chunk, exp){
			var result = new Object();
			var SCALES = ["илјада", "милион", "милијарда"];
			var scale = SCALES[exp - 1];
			if (scale) {
				if (chunk == 'еден') {
				chunk = '';
				} 
				else if (exp == 1 || exp == 3) {
						if ((chunk.indexOf('еден') > -1)) {
							chunk = chunk.replace('еден', 'една');
						}
						else {
							if (chunk.indexOf('два') == chunk.length - 4) {
								chunk = chunk.replace('два', 'две');
							}
							scale = scale.substr(0, scale.length - 1) + 'и';
						}
					}	
					else if (chunk.indexOf('еден') == -1) {
						scale += 'и';
					}
			}	
			result.scale = scale;
			result.chunk = chunk;
			return result;
		}	
	}
	
	function inMacedonian(number) {
		var result = '';	
		var hundreds, tens, ones, words = [];
		var ONE_TO_NINETEEN = [
			"еден", "два", "три", "четири", "пет",
			"шест", "седум", "осум", "девет", "десет",
			"единаесет", "дванаесет", "тринаесет", "четиринаесет", "петнаесет",
			"шеснаесет", "седумнаесет", "осумнаесет", "деветнаесет"];
		var TENS = ["десет", "дваесет", "триесет", "четириесет", "педесет",
			"шеесет", "седумдесет", "осумдесет", "деведесет"];
		var HUNDREDS = ["сто", "двесте", "триста", "четиристотини", "петстотини",
			"шестотини", "седумстотини", "осумстотини", "деветстотини"];
		if (number < 20) {
			result = ONE_TO_NINETEEN[number - 1];
		}
		else if (number < 100) {
			ones = number % 10;
			tens = Math.floor(number / 10);
			words.push(TENS[tens - 1]);
			words.push(ONE_TO_NINETEEN[ones - 1]);
			result = words.filter(isTruthy).join(" и ");
		}
		else {
			hundreds = Math.floor(number / 100);
			words.push(HUNDREDS[hundreds - 1]);
			var tensDigit = Math.floor((number % 100) / 10);
			if (tensDigit == 0)  {
				words.push(" и ")
			}
			words.push(inMacedonian(number % 100));	
			result = words.filter(isTruthy).join(" ");
		}
		return result;	
	}
	
}