$(document).ready(function(){

    Number.prototype.countDecimals = function () {
        if(this.toString().indexOf(".") === -1) return true;
        return false;
    }

    var $newRecipeView = $("#newRecipeView");
    var $allRecipesView = $("#allRecipesView");
    var $showRecipeView = $("#showRecipeView");

    var $recipeForm = $("#newRecipeForm");
    var $recipeName = $("input[name=recipeName]");
    var $recipeSrc = $("input[name=recipeSrc]");
    var $recipePrepTime = $("input[name=recipePrepTime]");
    var $recipeInstructions = $("textarea[name=recipeInstructions]");
    var $ingredientsDropdown = $("#ingredientsDropdown");
    var $ingredientQuantity = $("input[name=ingredientQuantity]");
    var $ingredientsButton = $(".addIngredient");
    var $tableOfIngredients = $("#ingredientTable");

    var $allRecipesDisplayTable = $("#allRecipesDisplayTable");

    var $btnListRecipes = $(".listRecipes");
    var $btnNewRecipe = $(".newRecipe");

    var deleteRecipeID = 0;
    var addedIngredients = "";


    var ingredients;
    if (localStorage.getItem("ingredients") === null){
        ingredients = ["Flour", "Milk", "Oil", "Salt", "Sugar", "Eggs", "Tomatoes", "Paprika", "White Cheese", "Yellow Cheese", "Potatoes", "Meat"];
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
    else ingredients = JSON.parse(localStorage.getItem("ingredients"));

    var recipes;
    if (localStorage.getItem("recipes") === null){
        recipes = new Array();
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    else recipes = JSON.parse(localStorage.getItem("recipes"));

    function Ingredient(name, quantity){
        this.name = name;
        this.quantity = parseFloat(quantity);
    }

    function Recipe(name, src, prepTime, instructions, ingredients){
        this.name = name;
        this.source = src;
        this.prepTime = parseInt(prepTime);
        this.prepInstructions = instructions;
        this.ingredients = ingredients;
    }

    ingredients.forEach(function(item){
        var $option = $("<option>");
        $option.text(item);
        $ingredientsDropdown.append($option);
    });

    $ingredientsButton.on("click", function(event){
        addedIngredients += $ingredientsDropdown.val();
        event.preventDefault();
        var ingredient = $ingredientsDropdown.val();
        var quantity = $ingredientQuantity.val();
        var $trIngredient = $("<tr>");
        var $tdIngredientName = $("<td>");
        var $tdIngredientQuantity = $("<td>");
        $tdIngredientName.text(ingredient);
        $tdIngredientQuantity.text(quantity);
        $trIngredient.append($tdIngredientName);
        $trIngredient.append($tdIngredientQuantity);
        $tableOfIngredients.append($trIngredient);
        $ingredientsButton.attr("disabled", true);
    });

    $btnListRecipes.on("click", function(event){
        $newRecipeView.hide();
        $showRecipeView.hide();
        $allRecipesView.show();

        $allRecipesDisplayTable.empty();

        if (localStorage.getItem("recipes") === null || JSON.parse(localStorage.getItem("recipes")).length < 1){
            alert("No recipes to show");
        }
        else {
            var allRecipes = JSON.parse(localStorage.getItem("recipes"));
            allRecipes.forEach(function(item, index){
                var $trCurrentRecipe = $("<tr>");
                $trCurrentRecipe.attr("id", index);
                var $tdForAttributes = $("<td>");
                $tdForAttributes.text(index);
                $trCurrentRecipe.append($tdForAttributes);
                $tdForAttributes = $("<td>");
                $tdForAttributes.text(item.name);
                $trCurrentRecipe.append($tdForAttributes);
                $tdForAttributes = $("<td>");
                $tdForAttributes.text(item.source);
                $trCurrentRecipe.append($tdForAttributes);
                $tdForAttributes = $("<td>");
                if (item.prepTime >= 60 && item.prepTime%60 > 0) $tdForAttributes.text(parseInt(item.prepTime/60) + " hours and " + item.prepTime%60 + " minutes.");
                else if (item.prepTime >= 60 && item.prepTime%60 === 0) $tdForAttributes.text(parseInt(item.prepTime/60) + " hours.");
                else if (item.prepTime < 60) $tdForAttributes.text(item.prepTime + " minutes.");
                $trCurrentRecipe.append($tdForAttributes);
                $tdForAttributes = $("<td>");
                var editedInstructions = "";
                if (item.prepInstructions.length > 50){
                    editedInstructions = item.prepInstructions.substring(0, 50).trim();
                    while (editedInstructions[editedInstructions.length - 1] != ' '){
                        editedInstructions  = editedInstructions.substring(0, editedInstructions.length - 1);
                    }
                    editedInstructions.trim();
                    $tdForAttributes.text(editedInstructions + "...");
                } else $tdForAttributes.text(editedInstructions);
                $trCurrentRecipe.append($tdForAttributes);
                $tdForAttributes = $("<td>");
                $tdForAttributes.text("");
                var allIngredients = item.ingredients;
                if (allIngredients.length <=3){
                    for(var i = 0; i < allIngredients.length; i++){
                        $tdForAttributes.text(function(){
                            if (i <= allIngredients.length - 2) return $tdForAttributes.text() + allIngredients[i].name + ", ";
                            else return $tdForAttributes.text() + allIngredients[i].name;
                        });
                    }
                } else {
                    for(var i = 0; i < 3; i++){
                        $tdForAttributes.text(function(){
                            if (i <= 1) return $tdForAttributes.text() + allIngredients[i].name + ", ";
                            else return $tdForAttributes.text() + allIngredients[i].name;
                        });
                    }
                    $tdForAttributes.text(function(){
                        return $tdForAttributes.text() + "...";
                    });
                }
                $trCurrentRecipe.append($tdForAttributes);

                $tdForAttributes = $("<td>");
                var $btnReadAllInfo = $("<button>");
                $btnReadAllInfo.attr({
                    class: "btn btn-default instructionSpacing"
                });
                $btnReadAllInfo.text("Read Full Recipe");

                $btnReadAllInfo.on("click", function(event){
                    event.preventDefault();
                    $newRecipeView.hide();
                    $showRecipeView.show();
                    $allRecipesView.hide();

                    $("#recipeNameDisplay").val(item.name);
                    $("#recipeSourceDisplay").val(item.source);
                    $("#recipePrepTimeDisplay").val(item.prepTime);
                    $("#recipeInstructionsDisplay").val(item.prepInstructions);
                    var ingredientsString = "";
                    item.ingredients.forEach(function(ingredient, index){
                        if (index < item.ingredients.length - 1) ingredientsString += ingredient.name + "(" + ingredient.quantity + "), ";
                        else ingredientsString += ingredient.name + "(" + ingredient.quantity + ").";
                    });
                    $("#recipeIngredientsDisplay").val(ingredientsString);
                });

                $tdForAttributes.append($btnReadAllInfo);

                var $btnDeleteRecipe = $("<button>");
                $btnDeleteRecipe.attr({
                    class: "btn btn-danger instructionSpacing",
                    id: index
                });
                $btnDeleteRecipe.text("Delete Recipe");

                $btnDeleteRecipe.on("click", function(event){
                    event.preventDefault();

                    deleteRecipeID = index;
                    $("#confirmDeletionModal").modal("show");
                });

                $tdForAttributes.append($btnDeleteRecipe);

                $trCurrentRecipe.append($tdForAttributes);

                $allRecipesDisplayTable.append($trCurrentRecipe);

            });
        }

    });
    $btnNewRecipe.on("click", function(event){
        event.preventDefault();
        $newRecipeView.show();
        $showRecipeView.hide();
        $allRecipesView.hide();


    });

    $recipeForm.on("submit", function(event){
        event.preventDefault();

        if ($tableOfIngredients.find("tr").length > 0){
            var ingredientsList = new Array();
            $tableOfIngredients.find("tr").each(function(index, item){
                ingredientsList.push(new Ingredient(item.getElementsByTagName("td")[0].innerHTML, item.getElementsByTagName("td")[1].innerHTML));
            });
            recipes.push(new Recipe($recipeName.val(), $recipeSrc.val(), $recipePrepTime.val(), $recipeInstructions.val(), ingredientsList));
            localStorage.setItem("recipes", JSON.stringify(recipes));

            $recipeName.val("");
            $recipeSrc.val("");
            $recipePrepTime.val("");
            $recipeInstructions.val("");
            $tableOfIngredients.empty();

            $ingredientQuantity.val("");
            addedIngredients = "";
        } else alert("Please add the ingredients needed to make the recipe");


    });

    $('#confirmDeletionModal .modal-footer button').on('click', function (e) {
        var $target = $(e.target); // Clicked button element
        $(this).closest('.modal').on('hidden.bs.modal', function () {
            if($target.text() === "Yes"){
                var allRecipes = JSON.parse(localStorage.getItem("recipes"));
                $("#" + deleteRecipeID).remove();
                allRecipes.splice(deleteRecipeID, 1);
                if (allRecipes.length >= 1) localStorage.setItem("recipes", JSON.stringify(allRecipes));
                else localStorage.setItem("recipes", JSON.stringify([]));
            }
        });
    });

    $(document).on('change',"#ingredientsDropdown", function() {

        //alert(addedIngredients.indexOf($ingredientsDropdown.val()));
        if (addedIngredients.indexOf($ingredientsDropdown.val()) > -1) {
            $ingredientsButton.attr("disabled", true);
        } else switch($(this).val()){
            case "Flour":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Eggs":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Milk":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Oil":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Salt":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Sugar":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Tomatoes":
                if (parseFloat($ingredientQuantity.val()) <= 50) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Paprika":
                if (parseFloat($ingredientQuantity.val()) <= 50) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "White Cheese":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Yellow Cheese":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Potatoes":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Meat":
                if (parseFloat($ingredientQuantity.val()) <= 20) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
        }

        //alert( $(this).val());
    });

    $ingredientQuantity.blur(function(event){

        //alert($ingredientsDropdown.val() + " focusout " + $ingredientQuantity.val());

        event.preventDefault();
        switch($ingredientsDropdown.val()){
            case "Flour":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Eggs":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Milk":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Oil":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Salt":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Sugar":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Tomatoes":
                if (parseFloat($ingredientQuantity.val()) <= 50) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Paprika":
                if (parseFloat($ingredientQuantity.val()) <= 50) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "White Cheese":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Yellow Cheese":
                if (parseFloat($ingredientQuantity.val()) <= 5) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Potatoes":
                if (parseFloat($ingredientQuantity.val()).countDecimals()) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
            case "Meat":
                if (parseFloat($ingredientQuantity.val()) <= 20) $ingredientsButton.attr("disabled", false);
                else $ingredientsButton.attr("disabled", true);
                break;
        }
    });

});