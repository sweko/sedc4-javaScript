$(document).ready(function(){
function tableData(){
	var $storingTable = $('#dataStored');
	var $inputData = $('#inputData');
	var $submit = $('#submit');
	var contactStored = 0;
	var update
	this.init = function(){
	var instance = this;


	$submit.on('click',function(){
		
		var name = $('#input1').val();
		var email = $('#input2').val();
		var phoneNumber = $('#input3').val();

		var contact = new Contact(name,email,phoneNumber);
		if(instance.validateEmail(contact.eMail)){
		instance.storingInfo(contact,contactStored);
		contactStored++
	}
	else{
		alert('Please enter valid e-mail in form "example@something.com"');
	}
	});
	$('#cancel').on('click',function(){
		instance.readOnlyArea();
	});
	$storingTable.on('click',function(event){
		var tar =event.target;
		if(tar.id == 'read'){
			var element =tar.parentNode
				.parentNode
				.parentNode;
			instance.displayTextArea(element.id);
		}
		else if(tar.id == 'update'){
			var element =tar.parentNode
				.parentNode
				.parentNode;
			instance.updateInfo(element.id,tar);
		}
		else if(tar.id == "delete" ){
			var element =tar.parentNode
				.parentNode
				.parentNode;
			element.parentNode.removeChild(element);
		}
		else if(tar.id == "save"){
			var element =tar.parentNode
				.parentNode
				.parentNode;
			instance.saveChanges(element.id,tar);	
		}
		
	});
}
	this.storingInfo = function(contact,id){
		

		var row = $('<tr>')
			.attr('id','row-'+id)
			.appendTo($('#dataStored'));
			
		var cell = $('<td>')
			.text(contact.name)
			.appendTo($('#row-'+id));
		var cell1 = $('<td>')
			.text(contact.eMail)
			.appendTo($('#row-'+id));
		var cell2 = $('<td>')
			.text(contact.phoneNumber)
			.appendTo($('#row-'+id));
		var cell3 = $('<td>')
			.html('<form class="form-inline"><button type="button" id="read" data-op="row-'+id+'" class= "btn btn-primary bt-xs">Read</button>'+
				'<button  type="button" id="update" data-op="row-'+id+'" class= "btn btn-success bt-xs">Update</button>'+ 
				'<button  type="button" onClick="deleteData(event)" id="delete"  data-op="row-'+id+'" class= "btn btn-danger bt-xs">Delete</button></form>')
			.appendTo($('#row-'+id));
	}
	this.updateInfo = function(id,button){
		var row = $('#'+id)
		for(var i = 0 ; i < 3; i++){
		row[0].cells[i].innerHTML = '<input type="text" id="data'+id+'-'+i+'">';
	}
	button.innerHTML = "Save";
	button.setAttribute('id','save');

	}
	this.saveChanges = function(id,button){
	var row = $('#'+id);
	var email= $('#data'+id+'-1')[0].value;
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(email)){
		for(var i = 0 ; i < 3; i++){
			var value = $('#data'+id+'-'+i)[0].value;
			row[0].cells[i].innerHTML = value

		}
	button.innerHTML = "Update";
	button.setAttribute('id','update');
	}
	else{
		alert('Please enter valid e-mail in form "example@something.com"')
	}

}
	this.displayTextArea = function(id){
		var row = $('#'+id);
		var fixed = ["Name: ","E-mail: ","Phone Number: "]
		var output = ""
		console.log()
	for(var i = 0 ; i < 3; i++){
	 var value = row[0].cells[i].innerHTML;
	 output += (fixed[i] + value)+"\n";
	}
	$('textarea').text("");
	$('textarea').append(output)
}
	this.readOnlyArea = function(){

		$('textarea').prop('readonly',true);
	}
	this.validateEmail= function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
}
var data = new tableData();
data.init();
});

function Contact(name , email,phonenumber){
	this.name = name;
	this.eMail = email;
	this.phoneNumber = phonenumber;
}
function deleteData(e){
	var del = e.target;
	
}
$('#delete').on('click',function(){
	var id = $("#delete")
		
		console.log(id);
});
