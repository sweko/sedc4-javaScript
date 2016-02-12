using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestAPI.Models;

namespace TestAPI.Providers
{
    public class RecipeProvider
    {
        private static Dictionary<string, List<Recipe>> RecipeRepository;
        
        static RecipeProvider()
        {
            RecipeRepository = new Dictionary<string, List<Recipe>>();
        }
            
        internal IEnumerable<Recipe> GetRecipesForUser(string username)
        {
            if (!RecipeRepository.ContainsKey(username))
            {
                RecipeRepository.Add(username, GetDefaultRecipes());
            }
            return RecipeRepository[username];
        }

        internal Recipe GetRecipeById(string username, int id)
        {
            return RecipeRepository[username].SingleOrDefault(r => r.Id == id);
        }

        internal void SaveRecipe(string username, Recipe recipe)
        {
            var old = RecipeRepository[username].SingleOrDefault(r => r.Id == recipe.Id);
            if (old != null)
            {
                RecipeRepository[username].Remove(old);
            }
            RecipeRepository[username].Add(recipe);
        }

        internal bool ResetRecipes(string username)
        {
            if (RecipeRepository.ContainsKey(username))
            {
                RecipeRepository[username] = GetDefaultRecipes();
            }
            else
            {
                RecipeRepository.Add(username, GetDefaultRecipes());
            }
            return true;
        }

        private List<Recipe> GetDefaultRecipes()
        {
            return new List<Recipe>
            {
                new Recipe
                {
                    Id = 1,
                    Name = "Пеперони Пица",
                    Source = "Флаер",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name ="Телефон", Quantity = 1}
                    },
                    PreparationTime = 30,
                    Instructions = "Се зема телефонот и се ѕвони на најблиската пицерија. Се нарачува пеперони пица, голема и се кажува адресата. Се чека половина час покрај надворешната врата и се отвара откога ќе заѕвони ѕвончето. Се јаде топла, со кечап по желба."
                },
                new Recipe
                {
                    Id = 2,
                    Name = "Пире од компири",
                    Source = "https://moirecepti.mk/",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name ="Компири", Quantity = 1000},
                        new Ingredient { Name ="Млеко", Quantity = 500},
                        new Ingredient { Name ="Путер", Quantity = 50},
                        new Ingredient { Name ="Сол", Quantity = 1},
                        new Ingredient { Name ="Зачин", Quantity = 1}
                    },
                    PreparationTime = 25,
                    Instructions = "Излупете ги и исечете ги компирите на коцки,ставете ги да се варат во вода.Откако ќе се сварат истурете ја вишокот вода од тенџерето. Жешки испасирјте ги со алатка за пасирање. Ставете го млекото претходно смлачено, путерот, солта, зачините и миксирајте со миксер додека се добие кремасто пире. Се служи топло."
                }
            };
        }

        internal void DeleteRecipe(string username, int id)
        {
            RecipeRepository[username].RemoveAll(r => r.Id == id);
        }
    }
}