function Contact(id, name, email, phone){
	this.id = id;
	this.firstName = name;
	this.email = email;
	this.mobile = phone;
}

function ContactInfo() {
	var allContacts = [];
	var index = 1;
		
	var form = document.getElementById("form");
	var table = document.getElementById("table");
    var textArea = document.getElementById("area");
	   
    this.init = function(){
        var instance = this;
		
	    form.addEventListener("submit", function(event){
		    event.preventDefault();
		    event.stopPropagation();				
						
		    var name = this.name.value;
		    var email = this.email.value;
		    var phone = this.phone.value;
		    var id = this.id.value;	
            
            if(name == "" || email == "" || phone == ""){
                alert("All fields are required!");
                return;
            }
            
		    var contact = new Contact(id, name, email, phone);             
		
		    if(id == 0){
		    	contact.id = index;
			    index++;
			    instance.addTable(contact);
			    instance.addStorage(contact);
		    }
		
		    this.reset();
	    });
    
        table.addEventListener("click", function(event){
            event.preventDefault();
        
            var op = event.target.getAttribute("data-op");
            var id = event.target.getAttribute("data-id");
                                           
            if(event.target.hasAttribute("data-op")){
                if(document.querySelector("tr.select")){
                   document.querySelector("tr.select").removeAttribute("class");
                } 
                if (op == "update"){
                     event.target.parentNode.setAttribute("class", "select");
                }                      
            } else if (event.target.parentNode.hasAttribute("id")) {
                if(document.querySelector("tr.select")){
                   document.querySelector("tr.select").removeAttribute("class");
                } 
                event.target.parentNode.setAttribute("class", "select");       
            }
            
            if(op == "read"){
                var c = instance.getFromStorage(id);          
                instance.addInfo(c);                              
            } else if (op == "update"){
                var c = instance.getFromStorage(id);
                instance.editRow(c);
            } else if (op == "save"){
                var c = instance.getFromRow(id);
                instance.updateRow(c);
                instance.updateStorage(c);
            } else if (op == "delete"){
                instance.deleteRow(id);
                instance.deleteStorage(id);
            }
        
        });
    }    
		
	this.addTable = function(contact){				
		var tr = document.createElement("tr");
		tr.setAttribute("id", "contact-"+ contact.id);
		
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
        td.innerHTML = "<button data-op='read' data-id='"+contact.id+"' href='#'>Read</button><button data-op='update' data-id='"+contact.id+"' href='#'>Update</button><button data-op='delete' data-id='"+contact.id+"' href='#'>Delete</button>";
		tr.appendChild(td);	
			
		table.appendChild(tr);								
	}
    
    this.addStorage = function(contact){
        allContacts.push(contact);
        console.log(allContacts);
    }
    
    this.getFromStorage = function(id){
        for(var i=0; i < allContacts.length; i++){
            if(id == allContacts[i].id){
                return allContacts[i];               
            }
        }
    }
    
    this.addInfo = function(contact){
        var nameInfo = "Name: " + contact.firstName;
        var emailInfo = "Email Address: " + contact.email;
        var phoneInfo = "Mobile phone: " + contact.mobile;
        var text = nameInfo + "\n" + emailInfo + "\n" + phoneInfo;
        textArea.innerHTML = text;
    }
    
    this.editRow = function(contact){
		var tr = document.getElementById("contact-" + contact.id);
		tr.innerHTML = "";
						
		var td = document.createElement("td");
		var input1 = document.createElement("input");
		input1.value = contact.firstName;
		td.appendChild(input1);
		tr.appendChild(td);
		
		var td = document.createElement("td");
		var input2 = document.createElement("input");
		input2.value = contact.email;
		td.appendChild(input2);
		tr.appendChild(td);
		
		var td = document.createElement("td");
		var input3 = document.createElement("input");
		input3.value = contact.mobile;
		td.appendChild(input3);
		tr.appendChild(td);
		
		var td = document.createElement("td");
        td.innerHTML = "<button data-op='read' data-id='"+contact.id+"' href='#'>Read</button><button data-op='save' data-id='"+contact.id+"' href='#'>Save</button><button data-op='delete' data-id='"+contact.id+"' href='#'>Delete</button>";
		tr.appendChild(td);	             
	}
    
    this.updateRow = function (contact){
        var tr = document.getElementById("contact-" + contact.id);
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
        td.innerHTML = "<button data-op='read' data-id='"+contact.id+"' href='#'>Read</button><button data-op='update' data-id='"+contact.id+"' href='#'>Update</button><button data-op='delete' data-id='"+contact.id+"' href='#'>Delete</button>";
		tr.appendChild(td);	
    }
    
    this.getFromRow = function(id){
        var tr = document.getElementById("contact-" + id);
        var children = tr.children;
        
        var name = children[0].firstChild.value;
        var email = children[1].firstChild.value; 
        var phone = children[2].firstChild.value;
        
        var contact = new Contact (id, name, email, phone);
        return contact;
        console.log(contact);
    }
    
    this.updateStorage = function(contact){
		for (var i=0; i < allContacts.length; i++){
			if(contact.id == allContacts[i].id){			
			    allContacts[i] = contact;
				break;
	        }
		}
        console.log(allContacts);
	}
    
    this.deleteRow = function(id){
		var tr = document.getElementById("contact-" + id);
		table.removeChild(tr);
    }
    
    this.deleteStorage = function(id){
		for(var i = 0; i < allContacts.length; i++){
			if(id == allContacts[i].id){
				allContacts.splice(i, 1);
				break;
			}
		}	
	} 
       	
}

var contactInfo = new ContactInfo();
contactInfo.init();	