(function() {
    angular
        .module('recipes', [])
        .controller('RecipesController', function($scope) {
            $scope.addedRecipes = [];
            setNewValuesToDefaults();
            $scope.ingredients = ['Брашно', 'Млеко', 'Масло', 'Сол', 'Шеќер',
             'Јајца', 'Патлиџани', 'Пиперки', 'Сирење', 'Кашкавал', 'Компир', 'Месо'];
             $scope.newIngredient = $scope.ingredients[0];
             $scope.addedIngredients = [];
             
             $scope.addIngredient = function() {
                 var addedIngredients = $scope.addedIngredients.map(i => i.ingredient);
                 var index = addedIngredients.indexOf($scope.newIngredient);
                 if (index > -1) {
                     $scope.addedIngredients[index].quantity = $scope.newIngredientQuantity;
                 } else {
                     $scope.addedIngredients.push({
                        ingredient: $scope.newIngredient,
                        quantity: $scope.newIngredientQuantity
                    });
                 }
             };
             var recipeId = 1;
             $scope.addRecipe = function() {
                 $('.error').hide();
                 if ($scope.newName.trim().length === 0) {
                     $('#noNameError').show();
                 } else if ($scope.newHowTo.trim().length === 0) {
                     $('#noHowToError').show();
                 } else if (!$scope.newTime) {
                     $('#noTimeError').show();
                 } else if ($scope.addedIngredients.length === 0) {
                     $('#noIngredientsError').show();
                 } else {
                     $scope.addedRecipes.push({
                         id: recipeId++,
                         name: $scope.newName,
                         source: $scope.newSource,
                         ingredients: $scope.addedIngredients,
                         time: $scope.newTime,
                         howTo: $scope.newHowTo
                     });
                     setNewValuesToDefaults();
                 }
             };
             
             $scope.convertTime = function(minutes) {
                 var result = '';
                 var allMinutes = Number(minutes);
                 var hours = Math.floor(allMinutes/60);
                 var leftMinutes = allMinutes % 60;
                 if (hours > 0) {
                     result += hours + ' часови ';
                 }
                 result += leftMinutes + ' минути';
                 return result;
             };
             
             $scope.removeRecipe = function(id) {
                 if (!window.confirm('Избриши рецепт?')) {
                     return;
                 }
                 var index = $scope.addedRecipes.map(r => r.id).indexOf(id);
                 if (index > -1) {
                    $scope.addedRecipes.splice(index, 1);
                }
             }
             
             $scope.showRecipeDetails = function () {
               $( "#tabs" ).tabs( { active: 2 });  
             };
             
             function setNewValuesToDefaults() {
                    $scope.newName = '';
                    $scope.newSource = '';
                    $scope.addedIngredients = [];
                    $scope.newTime = undefined;
                    $scope.newHowTo = '';
             }
        });
})();

$(function() {
    $( "#tabs" ).tabs();
});