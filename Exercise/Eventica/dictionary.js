var dictionary = {
	items: [],
	onchange: function(){
		if (this.render)
			this.render();
	},
	add: function(entry){
		this.items.push(entry);
		this.onchange();
	},
	delete: function (index){
		this.items.splice(index, 1);
		this.onchange();
	},
	render: undefined,
};




var entry = {
	macedonian:"Јаболко",
	english: "Apple"
};

dictionary.add(entry);
dictionary.add({
	macedonian:"Круша",
	english: "Pear"
});

function renderDictionary(){
	var result = document.getElementById("result");
	result.innerHTML = "";
	for (var index = 0; index < dictionary.items.length; index++) {
		var entry = dictionary.items[index];
		var tr = result.insertRow();
		var td = tr.insertCell();
		td.innerHTML = entry.english;
		
		td = tr.insertCell();
		td.innerHTML = entry.macedonian;
		
		td = tr.insertCell();
		var button=document.createElement("button");
		button.innerHTML="X";
		button.addEventListener("click", (function(index){
			return function(){
				dictionary.delete(index);
			};
		})(index));
		td.appendChild(button);
	}
}

document.addEventListener('DOMContentLoaded', function(){
	dictionary.render = renderDictionary;
	dictionary.render();
	
	var button = document.getElementById("addWord");
	button.addEventListener("click", function(){
		var mac = document.getElementById("macedonian").value;
		var eng = document.getElementById("english").value;
		dictionary.add({
			macedonian:mac,
			english:eng
		});
	});
});