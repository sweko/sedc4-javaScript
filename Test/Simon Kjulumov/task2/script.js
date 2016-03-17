function User(id, name, email, mobile){
	this.id = id;
	this.name = name;
	this.email = email;
	this.mobile = mobile;
}

function userInfo() {
	var userArray = [];
	var index = 1;	
	var form = document.getElementById("form");
	var table = document.getElementById("table");
    var details = document.getElementById("details");
	   
    this.init = function(){
       	    var instance = this;
		    form.addEventListener("submit", function(event){
		    event.preventDefault();
		    event.stopPropagation();				
						
			var id = this.id.value;	
		    var name = this.name.value;
		    var email = this.email.value;
		    var mobile = this.mobile.value;            
		    var user = new User(id, name, email, mobile);             
		
		    if(id == 0){
		    	user.id = index;
			    index++;
			    instance.addTable(user);
			    instance.addStorage(user);
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
		
	this.addTable = function(user){				
		var tr = document.createElement("tr");
		tr.setAttribute("id", "user-"+ user.id);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.name));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.email));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.mobile));
		tr.appendChild(td);
		
		var td = document.createElement("td");
        td.innerHTML = "<button data-op='read' data-id='"+user.id+"' href='#' class='button-read'>Read</button><button data-op='update' data-id='"+user.id+"' href='#'class='button-update'>Update</button><button data-op='delete' data-id='"+user.id+"' href='#' class='button-delete'>Delete</button>";
		tr.appendChild(td);	
			
		table.appendChild(tr);								
	}
    
    this.editRow = function(user){
		var tr = document.getElementById("user-" + user.id);
		tr.innerHTML = "";
						
		var td = document.createElement("td");
		var input1 = document.createElement("input");
		input1.value = user.name;
		td.appendChild(input1);
		tr.appendChild(td);
		
		var td = document.createElement("td");
		var input2 = document.createElement("input");
		input2.value = user.email;
		td.appendChild(input2);
		tr.appendChild(td);
		
		var td = document.createElement("td");
		var input3 = document.createElement("input");
		input3.value = user.mobile;
		td.appendChild(input3);
		tr.appendChild(td);
		
		var td = document.createElement("td");
        td.innerHTML = "<button data-op='read' data-id='"+user.id+"' href='#'class='button-read'>Read</button><button data-op='save' data-id='"+user.id+"' href='#'class='button-update'>Save</button><button data-op='delete' data-id='"+user.id+"' href='#' class='button-delete'>Delete</button>";
		tr.appendChild(td);	             
	}
	 this.updateRow = function (user){
        var tr = document.getElementById("user-" + user.id);
		tr.innerHTML = "";		
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.name));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.email));
		tr.appendChild(td);
		
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(user.mobile));
		tr.appendChild(td);
		
		var td = document.createElement("td");
        td.innerHTML = "<button data-op='read' data-id='"+user.id+"' href='#'class='button-read'>Read</button><button data-op='update' data-id='"+user.id+"' href='#'class='button-update'>Update</button><button data-op='delete' data-id='"+user.id+"' href='#' class='button-delete'>Delete</button>";
		tr.appendChild(td);	
    }

     this.getFromRow = function(id){
        var tr = document.getElementById("user-" + id);
        var children = tr.children;
        
        var name = children[0].firstChild.value;
        var email = children[1].firstChild.value; 
        var mobile = children[2].firstChild.value;
        
        var user = new User (id, name, email, mobile);
        return user;
    }

    this.deleteRow = function(id){
		var tr = document.getElementById("user-" + id);
		table.removeChild(tr);
    }
    this.addStorage = function(user){
        userArray.push(user);
    }
    
    this.getFromStorage = function(id){
        for(var i=0; i < userArray.length; i++){
            if(id == userArray[i].id){
                return userArray[i];               
            }
        }
    }
     
    this.updateStorage = function(user){
		for (var i=0; i < userArray.length; i++){
			if(user.id == userArray[i].id){			
			    userArray[i] = user;
				break;
	        }
		}
	}
    
    this.deleteStorage = function(id){
		for(var i = 0; i < userArray.length; i++){
			if(id == userArray[i].id){
				userArray.splice(i, 1);
				break;
			}
		}	
	} 
	this.addInfo = function(user){
       var userName = "Name: " + user.name;
       var userEmail = "Email Address: " + user.email;
       var userMobile = "Mobile number: " + user.mobile;
       details.innerHTML = userName + "\n" + userEmail + "\n" + userMobile;
    }
       	
}

var userInfo = new userInfo();
userInfo.init();	