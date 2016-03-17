$(function(){
    
    function Receipe(id, name, source, ingredients, time, describe){
        this.id = id;
        this.receipeName = name;
        this.receipeSource = source;
        this.ingredientsName_Quantity = ingredients;
        this.preparingTime = time;
        this.preparDescribe = describe
    }
    
    var saveReceipes = [];
    var index = 1  
    var $content = $("#content");     
	
	$("#newRecipe").on("click", function(){
        var $saveIngredients = [];
        
        var $formView = $("<form>").attr("id", "formView");
       
        
		var $recipeName = $("<input>");
        $recipeName.attr({
            class: "form-control input-field-margin",
            name: "recipeName",
            type: "text",
            placeholder: "Име на рецептот"
        });
        
        var $recipeSource = $("<input>");
        $recipeSource.attr({
            class: "form-control input-field-margin",
            name: "recipeSource",
            type: "text",
            placeholder: "Извор на рецептот"
        });
        
        var $ingredientsList = $("<select name='ingredient'>").addClass("form-control input-field-margin");               
        for(var i=0; i < 13; i++) {          
            var $ingredient = $("<option>");
            switch(i) {
                    case 0:
                        $ingredient.text("Избери состојка"); 
                        $ingredient.attr("value", "");                     
                        break;
                    case 1:
                        $ingredient.text("Брашно");  
                        $ingredient.attr("value", "Брашно");                      
                        break;
                    case 2:
                        $ingredient.text("Млеко"); 
                        $ingredient.attr("value", "Млеко");                       
                        break;
                    case 3:
                        $ingredient.text("Масло");  
                        $ingredient.attr("value", "Масло");                   
                        break;
                    case 4:
                        $ingredient.text("Сол");
                        $ingredient.attr("value", "Сол");
                        break;
                    case 5:
                        $ingredient.text("Шеќер");
                        $ingredient.attr("value", "Шеќер");
                        break;
                    case 6:
                        $ingredient.text("Јајца");
                        $ingredient.attr("value", "Јајца");
                        break;
                    case 7:
                        $ingredient.text("Домати");
                        $ingredient.attr("value", "Домати");
                        break;
                    case 8:
                        $ingredient.text("Пиперки");
                        $ingredient.attr("value", "Пиперки");
                        break;
                    case 9:
                        $ingredient.text("Сирење");
                        $ingredient.attr("value", "Сирење");
                        break;
                    case 10:
                        $ingredient.text("Кашкавал");
                        $ingredient.attr("value", "Кашкавал");
                        break;
                    case 11:
                        $ingredient.text("Компир");
                        $ingredient.attr("value", "Компир");
                        break;
                    case 12: 
                        $ingredient.text("Месо");  
                        $ingredient.attr("value", "Месо");                                      
            } 
             $ingredientsList.append($ingredient);                       
        }
        
        var $quantityList = $("<select name='quantity'>").addClass("form-control input-field-margin");               
        for(var i=0; i < 21; i++) {          
            var $quantity = $("<option>");
            switch(i) {
                    case 0:
                        $quantity.text("Избери количина во гр.");
                        $quantity.attr("value", "");                      
                        break;
                    case 1:
                        $quantity.text("50");
                        $quantity.attr("value", "50гр");                        
                        break;
                    case 2:
                        $quantity.text("100");
                        $quantity.attr("value", "100гр");                        
                        break;
                    case 3:
                        $quantity.text("150"); 
                        $quantity.attr("value", "150гр");                    
                        break;
                    case 4:
                        $quantity.text("200");
                        $quantity.attr("value", "200гр");
                        break;
                    case 5:
                        $quantity.text("250");
                        $quantity.attr("value", "250гр");
                        break;
                    case 6:
                        $quantity.text("300");
                        $quantity.attr("value", "300гр");
                        break;
                    case 7:
                        $quantity.text("350");
                        $quantity.attr("value", "350гр");
                        break;
                    case 8:
                        $quantity.text("400");
                        $quantity.attr("value", "400гр");
                        break;
                    case 9:
                        $quantity.text("450");
                        $quantity.attr("value", "450гр");
                        break;
                    case 10:
                        $quantity.text("500");
                        $quantity.attr("value", "500гр");
                        break;
                    case 11:
                        $quantity.text("550");
                        $quantity.attr("value", "550гр");
                        break;
                    case 12: 
                        $quantity.text("600");
                        $quantity.attr("value", "600гр");   
                    case 13:
                        $quantity.text("650"); 
                        $quantity.attr("value", "650гр");                     
                        break;
                    case 14:
                        $quantity.text("700"); 
                        $quantity.attr("value", "700гр");                       
                        break;
                    case 15:
                        $quantity.text("750"); 
                        $quantity.attr("value", "750гр");                      
                        break;
                    case 16:
                        $quantity.text("800");
                        $quantity.attr("value", "800гр");                     
                        break;
                    case 17:
                        $quantity.text("850");
                        $quantity.attr("value", "850гр");
                        break;
                    case 18:
                        $quantity.text("900");
                        $quantity.attr("value", "900гр");
                        break;
                    case 19:
                        $quantity.text("950");
                        $quantity.attr("value", "950гр");
                        break;
                    case 20:
                        $quantity.text("1000");
                        $quantity.attr("value", "1000гр");                                                 
            } 
             $quantityList.append($quantity);                       
        }
        
        var $addIngredients = $("<button>").attr({
            class: "btn btn-success btn-block",           
            id: "addIngredients"          
        });
        $addIngredients.text("Додади состојка") 
        
        var $list = $("<ol>").addClass({
                class: "form-control input-field-margin",
                id: "ingredients"              
            });
        $addIngredients.on("click", function(event){
            event.preventDefault();
            
            var $createList = $("<li>");
            var $addOptions = $("select[name='ingredient'] option:selected").val() + " - " + $("select[name='quantity'] option:selected").val();
            $createList.text($addOptions);
            $list.append($createList);  
            $saveIngredients.push($addOptions);        
        });   
        
        var $preparingTime = $("<input>");
        $preparingTime.attr({
            class: "form-control input-field-margin",
            name: "time",
            type: "number",
            placeholder: "Потребно време за подготовка во минути"
        }); 
        
        var $preparing = $("<textarea>");
        $preparing.attr({
            class: "form-control input-field-margin",
            name: "preparing",
            type: "text",
            placeholder: "Опишете го начинот на подготовка..."
        }); 
        
         var $finishAdd = $("<button>").attr({
            class: "btn btn-primary btn-block", 
            type: "submit",          
            id: "finishAdd"          
        });
        $finishAdd.text("Внесете го рецептот"); 
        
        $finishAdd.on("click", function(event){
            event.preventDefault();
            
            var id = index;
            index++;
            var name = $recipeName.val();
            var source = $recipeSource.val();
            var ingredients = $saveIngredients; 
            var time = $preparingTime.val();
            var describe = $preparing.val();
            
            var receipe = new Receipe(id, name, source, ingredients, time, describe);
            saveReceipes.push(receipe);
            console.log(saveReceipes);
            
            document.getElementById("formView").reset();
            $list.empty();
            
        });                                          
             
        $content.empty();

        $formView.append($recipeName);
        $formView.append($recipeSource);
        $formView.append($ingredientsList);
        $formView.append($quantityList);
        $formView.append($addIngredients);
        $formView.append($list);
        $formView.append($preparingTime);
        $formView.append($preparing);
        $formView.append($finishAdd);
        $content.append($formView);
				
	});
	
	$("#findRecipe").on("click", function(event){
        event.preventDefault();
        
        var $createTable = $("<table>").addClass("table");
        var $createHead = $("<thead>");
        for(var i = 0; i < 8; i++) {
            var $createTh = $("<th>");
            switch(i) {
                    case 0:
                        $createTh.text("Реден број");                                           
                        break;
                    case 1:
                        $createTh.text("Име на рецептот");                    
                        break;
                    case 2:
                        $createTh.text("Извор на рецептот");                      
                        break;
                    case 3:
                        $createTh.text("Број на состојки");                   
                        break;
                    case 4:
                        $createTh.text("Состојки");
                        break;
                    case 5:
                        $createTh.text("Начин на подготовка");
                        break;
                    case 6:
                        $createTh.text("Време за подготовка");
                        break;
                    case 7:
                        $createTh.text("Прикажи/Избриши");                      
            }            
            $createHead.append($createTh);
        }
        $createTable.append($createHead);
        
        $content.empty();
        
        $content.append($createTable);                      				
		
	});
    
    
});