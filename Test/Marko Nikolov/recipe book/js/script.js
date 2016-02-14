$(document).ready(function () {
    
 

    function Recipe(recipeName, recipeSource, listOfIngredients, numberOfIngredients,
        preparationTime, wayOfPreparation) {
        this.recipeName = recipeName;
        this.recipeSource = recipeSource;
        this.listOfIngredients = listOfIngredients;
        this.numberOfIngredients = numberOfIngredients;
        this.preparationTime = preparationTime;
        this.wayOfPreparation = wayOfPreparation;
    };
    var recipes = [];
    var recipeName = $("#recipeName");
    var recipeSource = $("#recipeSource");
    var listOfIngredients = $("#listOfIngredients");
    var numberOfIngredients = $("#numberOfIngredients");
    var preparationTime = $("#preparationTime");
    var wayOfPreparation = $("#wayOfPreparation");
    var submitIngredient = $("#submitIngredient")
    var submitRecipe = $("#submitRecipe");
    
    submitIngredient.on("click", function (e) {
       
        console.log(this);
 });
   
    var id = 0;
    submitRecipe.on("click", function (e) {
        e.preventDefault();
        
 
             if (recipeName.val() == "" || recipeSource.val() == "" || listOfIngredients.val() == ""
             || numberOfIngredients.val() == "" || preparationTime.val() == "" || wayOfPreparation.val() == ""){
alert("Please Fill Required Fields");

} else {

        var newRecipe = new Recipe(recipeName.val(), recipeSource.val(), listOfIngredients.val(), numberOfIngredients.val(), preparationTime.val(),
            wayOfPreparation.val());

        recipes.push(newRecipe);
        var newTableRow = $("<tr>");
        var newIngridientsRow = $("<tr>");
        var recipeNametd = $("<td>");
        var recipeSourcetd = $("<td>");
        var listOfIngredientstd = $("<td>");
        var numberOfIngredientstd = $("<td>");
        var preparationTimetd = $("<td>");
        var wayOfPreparationtd = $("<td>");

        recipeNametd.text(recipeName.val());
        recipeSourcetd.text(recipeSource.val());
        listOfIngredientstd.text(listOfIngredients.val());
        numberOfIngredientstd.text(listOfIngredients.val());
        preparationTimetd.text(preparationTime.val());
        wayOfPreparationtd.text(wayOfPreparation.val());

        newTableRow.append("<td>" + id + "</td>");
        id++;
        newTableRow.append(recipeNametd);
        newTableRow.append(recipeSourcetd);
        newTableRow.append(preparationTimetd);
        newTableRow.append(wayOfPreparationtd);
        
        newIngridientsRow.append(listOfIngredientstd);
        newIngridientsRow.append(numberOfIngredientstd);


        $("#recipeTable").append(newTableRow);
        $("ingredientsTable").append(newIngridientsRow);
        console.log(newRecipe);
};
 
    });

});























