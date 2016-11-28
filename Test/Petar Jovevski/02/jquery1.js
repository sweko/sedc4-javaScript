function Contact(id, name, email, mobile) {
	this.id = id;
	this.firstName = name;
	this.email = email;
	this.mobile = mobile;
}

function AddressBook() {
	var contacts = [];
	var index = 1;
	
	var form = document.getElementById("contacts-form");
	//var discard = document.getElementById("contacts-op-discard");
	var save = document.getElementById("contacts-op-save");
	var table = document.getElementById("contacts-table");
	var details = document.getElementById("details");
	
	this.init = function() {
		var instance = this;
		/*discard.addEventListener("click", function(event){
			event.stopPropagation();
			form.reset();
		}); */
		
		form.addEventListener("submit", function(event) {
			event.stopPropagation();
			event.preventDefault();
		
			//gi citame vrednostite od input polinjata
			var name = this.first_name.value;
			var email = this.email.value;
			var mobile = this.mobile.value;
			var id=0;
			
			var contact = new Contact(id, name, email, mobile);
						
			contact.id = index;
			index++;
			instance.addTable(contact);
			instance.addStorage(contact);
			
			this.reset();
		});
	
		table.addEventListener("click", function(event) {
			event.preventDefault();
			
			var op = event.target.getAttribute("data-op");
			var id = event.target.getAttribute("data-id");
			
			if(op == "edit") {
				/*
				var storage = instance.getFromStorage(id);
				if(storage != null){
					instance.editForm(storage);

				}
				*/
				var c = instance.getFromStorage(id);
				if(c != null){
					instance.editRow(c);
				}
			}
			else if(op == "save"){
				var c = instance.getFromRow(id);
				instance.editTable(c);
				instance.editStorage(c);
				
			} else if(op == "delete") {
				instance.deleteStorage(id);
				instance.deleteTable(id);
			}
			else if(op == "read"){
				var c = instance.getFromStorage(id);
				
				details.innerHTML = "";
				
				var h3Title = document.createElement("h3");
				h3Title.innerHTML="Details";
				details.appendChild(h3Title);
				
				var divName = document.createElement("div");
				divName.innerHTML="Name: "+c.firstName;
				details.appendChild(divName);
				
				var divEmail = document.createElement("div");
				divEmail.innerHTML="Email: "+c.email;
				details.appendChild(divEmail);
				
				var divMobile = document.createElement("div");
				divMobile.innerHTML="Mobile: "+c.mobile;
				details.appendChild(divMobile);
			}
			
		
	});
	}
	this.editRow = function(contact) {
		var tr = document.getElementById("contact-" + contact.id);
		tr.innerHTML="";
		
		var td = document.createElement("td");
		var input = document.createElement("input");
		input.value = contact.firstName;
		td.appendChild(input);
		tr.appendChild(td);
				
		var td = document.createElement("td");
		var input = document.createElement("input");
		input.value = contact.email;
		td.appendChild(input);
		tr.appendChild(td);
		
		
		var td = document.createElement("td");
		var input = document.createElement("input");
		input.value = contact.mobile;
		td.appendChild(input);
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.innerHTML = "<a data-op='save' data-id='"+ contact.id +"'class='btn btn-success' href='#'>Save</a>  <a data-op='delete' data-id='"+ contact.id +"'class='btn btn-danger' href='#'>Delete</a>";
		tr.appendChild(td);
		
		
	}
	this.getFromRow = function(id) {
		var tr = document.getElementById("contact-" + id);
		var children = tr.children;
		
		var name = children[0].firstChild.value;
		var email = children[1].firstChild.value;
		var mobile = children[2].firstChild.value;
		
		var contact = new Contact(id, name, email, mobile);
		return contact;
	}
	this.addTable = function(contact) {
		var tr = document.createElement("tr");
		
	
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.firstName));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.email));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.mobile));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.innerHTML = "<a data-op='read' data-id='"+ contact.id +"'class='btn btn-default' href='#'>Read</a> <a data-op='edit' data-id='"+ contact.id +"'class='btn btn-success' href='#'>Update</a> <a data-op='delete' data-id='"+ contact.id +"'class='btn btn-danger' href='#'>Delete</a>";
		tr.appendChild(td);
		
		tr.setAttribute("id", "contact-" + contact.id)
		table.appendChild(tr);
	}
	
	this.editTable = function(contact) {
		var tr = document.getElementById('contact-' + contact.id);
		tr.innerHTML = "";

		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.firstName));
		tr.appendChild(td);

		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.email));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(contact.mobile));
		tr.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = "<a data-op='read' data-id='"+ contact.id +"'class='btn btn-default' href='#'>Read</a> <a data-op='edit' data-id='"+ contact.id +"'class='btn btn-success' href='#'>Update</a> <a data-op='delete' data-id='"+ contact.id +"'class='btn btn-danger' href='#'>Delete</a>";
		tr.appendChild(td);
	}
	
	this.deleteTable = function(id) {
		var tr = document.getElementById("contact-" + id);
		table.removeChild(tr);
	}
	
	this.addStorage = function(contact) {
		contacts.push(contact);
		console.log(contacts);
	}
	
	this.editStorage = function(contact) {
		for(var i = 0; i < contacts.length; i++) {
			if(contacts[i].id == contact.id) {
				contacts[i] = contact;
				break;
			}
		}
	}
	
	this.deleteStorage = function(id) {
		for(var i=0; i < contacts.length; i++) {
			if(contacts[i].id == id) {
				contacts.splice(i, 1);
				break;
			}
		}
		
		console.log(contacts);
	}
	
	this.getFromStorage = function(id){
		for(var i = 0; i < contacts.length; i++){
			if(contacts[i].id == id) {
				return contacts[i];
			}
		}
		return null;
	}
	// add the fields in the form 
	this.editForm = function(contact){
		form.first_name.value = contact.firstName;
		form.email.value = contact.email;
		form.mobile.value = contact.mobile;
	}
}


var addressBook = new AddressBook();
addressBook.init();