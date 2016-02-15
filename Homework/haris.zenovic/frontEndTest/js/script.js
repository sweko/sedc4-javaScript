$(document).ready(function(){
	var $checkBoxes = $('.box');
	var next = $checkBoxes[0];
	var label = $(next).parent();
/*  puting ingridiance for recept */
	$checkBoxes.on('change', function (e){
		var presed = $(e.target);
	
		var label = $(presed)
						.parent()
						.text();
		var storage = $('#quantity');
		var div = $('<div class="col-xs-2">');
		var select = $('<select id='+label+'s>');
		
		switch(label){
			case 'Flour':
				for(var i = 0 ; i < 1000; i+=50){
					var option = $('<option value="i">');
					$(option).text(i +"g");
					$(select).append(option);
				}
				break;
			case 'Milk':
				for(var i = 0 ; i < 10; i++){
					var option = $('<option value="i">');
					$(option).text(i +"dl");
					$(select).append(option);
				}
				break;	
			case 'Butter':
				for(var i = 0 ; i < 1000; i+=50){
					var option = $('<option value="i">');
					$(option).text(i +"g");
					$(select).append(option);
				}
				break;
			case 'Salt':
				for(var i = 0 ; i < 20; i+=2){
					var option = $('<option value="i">');
					$(option).text(i +"scoops");
					$(select).append(option);
				}
				break;
			case 'Sugar':
				for(var i = 0 ; i < 20; i+=2){
					var option = $('<option value="i">');
					$(option).text(i +"scoops");
					$(select).append(option);
				}
				break;
			case 'Eggs':
				for(var i = 0 ; i < 10; i++){
					var option = $('<option value="i">');
					$(option).text(i);
					$(select).append(option);
				}
				break;
			case 'Tomato':
				for(var i = 0 ; i < 5; i++){
					var option = $('<option value="i">');
					$(option).text(i +"kg");
					$(select).append(option);
				}
				break;
			case 'Pepers':
				for(var i = 0 ; i < 5; i++){
					var option = $('<option value="i">');
					$(option).text(i +"kg");
					$(select).append(option);
				}
				break;
			case 'Cheese':
				for(var i = 0 ; i < 1000; i+=50){
					var option = $('<option value="i">');
					$(option).text(i +"g");
					$(select).append(option);
				}
				break;
			case 'Chedar':
				for(var i = 0 ; i < 1000; i+=50){
					var option = $('<option value="i">');
					$(option).text(i +"g");
					$(select).append(option);
				}
				break;
			case 'Patato':
				for(var i = 0 ; i < 5; i++){
					var option = $('<option value="i">');
					$(option).text(i +"kg");
					$(select).append(option);
				}
				break;
			case 'Meat':
				for(var i = 0 ; i < 1000; i+=50){
					var option = $('<option value="i">');
					$(option).text(i +"g");
					$(select).append(option);
				}
				break;
		}
		
		if($(presed).is(':checked')){
			
			var labeltag = $('<label>');
			$(labeltag).text(label);
			var div = $('<div class="col-xs-3 select">');
			$(div).append(select);
			$(div).append(label);
			$(div).attr('id',label);
			$(storage).append(div)
		}
		else{
			$("#"+label).remove();
		}
	});
/* recipt long one */

var area = $('#area');
$(area).keypress(function(){
	var string = $(area).val()
					.length + 1;
	var total = 500;
	var rem = total - string ;
	$('#num').text(rem);
});
/* recept object for transfering data to storing table */
var noRecipts = 0;
var recepts = [];
function Recept(id,name,origin,ingridiance,fullIngridiance,recept,fullRecept,timeOfMaking){
	this.id = id;
	this.name = name;
	this.origin = origin;
	this.ingidiance = ingridiance;
	this.fullIngridiance = fullIngridiance;
	this.recept = recept;
	this.fullRecept = fullRecept;
	this.timeOfMaking = timeOfMaking;
}
/* sstoring table like object for easier storing in table */ 
function storedRec(){
	var instance= this;
	var submit = $('#submit');
	var stored = $('#stored');
	var display = $('#displayIt');
	var form = document.getElementById("form");
	/* displaying receipt in display div */
	$(stored).click(function(e){
		var target = e.target;
		var id = $(target).attr("id");
		var num = id.split("-");
		var n = num[1];
		var disRecept = recepts[(n-1)];
		instance.displayThis(disRecept);
	});
	this.init = function(){
		$(submit).on('click',function(e){
			e.preventDefault();
			noRecipts++;

			var name = $('#nameR').val();
			var origin = $('#originR').val();
			var ingidiance =instance.collectIng();
			var fullIngridiance = instance.collectIng();
			var area = $('#area').val();
			var recept = $(area).val();
			var fullRecept = area.substring(0,12);
			var time  = instance.timeOfMaking();
			var recept = new Recept(noRecipts,name,origin,ingidiance,fullIngridiance,area,fullRecept,time);
			instance.addToTable(recept);
			console.log(recept);
			recepts.push(recept);
			console.log(recepts);

			form.reset();
			/* removing already checked ingrediance */
			$('.select').remove();
		
	});
		/*function for displaying recipts */
this.displayThis = function (recept){
	var display = $('#displayIt');
	$(display).empty();
	var header = $('<h1>').text(recept.name)
							.appendTo($(display));
	var origin = $('<h4>').text(recept.origin)
							.appendTo($(display));
	var ingrediance = $('<h6>').text(this.stringIng(recept.ingidiance))
								.appendTo($(display));
	var mainRec = $('<p>').text(recept.fullRecept)
							.appendTo($(display));
	var time = $('<p>').text(recept.timeOfMaking)
						.appendTo($(display));


}
/* function for putting ingrediance into string */
this.stringIng = function (array) {
	console.log(array);
	var str = "";
	for(var i = 0 ; i < array.length; i ++){
		str += array[i]+ " ";
	}
	return str;
}
		/* function for collecting ingrediance */ 
this.collectIng = function () {
	var check = $('#quantity').children();
	var ingrs = [];

	for(var i = 0 ; i < check.length ; i ++){
		var str = "";
		var child = $(check)[i];
		var id = $(child).attr("id");
		var select = $(child)
						.find('select');
		var txt = $('#'+id+"s option:selected").text();
		str += txt +" "+ id
		ingrs.push(str);
		
	}
	return ingrs;
}
/* function for declaring time */
this.timeOfMaking = function(){

	var hours = $('#hours').val();
	var min = $('#min').val();
	if(hours < 24 && min < 60){
			if(hours === 0 || hours === undefined){
				var str = "";
				str += ""+min+" min ";
				return str; 
			}
			else if(min === 0 || min === undefined){
				var str = "";
				str += ""+hours+" hours ";
				return str; 
			}
			else{
				var str = "";
				str += hours+" hours "+min+" min ";
				return str; 
			}
		}
	
	else{
		alert('Please enter proper values for hours and minutes')
	}
}
/* function for entering numbers in table */
this.addToTable = function (recept){
	var row = $('<tr id="row-"'+recept.id+'>');
	var cell1 = $('<td>').text(recept.id).appendTo(row);
	var cell2 = $('<td>').text(recept.name).appendTo(row);
	var cell3 = $('<td>').text(recept.origin).appendTo(row);
	
	var str = instance.getArrayIng(recept);
	var cell4 = $('<td>').text(str).appendTo(row);

	var cell5 = $('<td>').text(recept.recept).appendTo(row);
	var cell6 = $('<td>').text(recept.timeOfMaking).appendTo(row);
	var cell7 = $('<td>').html('<button class="btn btn-success" id="display-'+recept.id+'">Display</button>').appendTo(row);
	console.log(cell7);
	$(row).appendTo($('#stored'));

}
	this.getArrayIng = function(recept){
		var array = recept.ingidiance;
		var main = "";
		for(var i = 0 ; i < array.length; i ++){
			var str = array[i].split(" ");
			main += str[1] + "  "
		}
		console.log(main);
		return main;
		
	}
}
}

	



    $( "#accordion" ).accordion({
      collapsible: true
    });
var rec = new storedRec();
rec.init();

});
