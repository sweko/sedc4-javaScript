using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TestAPI.Models;
using TestAPI.Providers;

namespace TestAPI.Controllers
{
    /// <summary>
    /// Controls the API for the recipe management
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RecipesController : ApiController
    {
        RecipeProvider provider;

        /// <summary>
        /// Creates a new RecipesController, with the default RecipeProvider
        /// </summary>
        public RecipesController()
        {
            provider = new RecipeProvider();
        }

        /// <summary>
        /// Gets a list of stored recipes for a specified user. Returns default recipes if the user is first-time user
        /// </summary>
        /// <param name="username">The user on whose behalf we get the recipes</param>
        /// <returns>Collection of recipes, belonging to the user</returns>
        public IEnumerable<Recipe> Get(string username)
        {
            return provider.GetRecipesForUser(username);
        }

        /// <summary>
        /// Resets the recipes for a specified user to the default recipes
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <returns>True if the reseting was successfull, false otherwise</returns>
        [Route("reset/{username}")]
        public bool Reset(string username)
        {
            return provider.ResetRecipes(username); ;
        }

        /// <summary>
        /// Gets a specified recipe for a specified user
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="id">The id of the recipe</param>
        /// <returns>The recipe with the specified id for the specified user, if it exists, null otherwise</returns>
        public Recipe Get(string username, int id)
        {
            return provider.GetRecipeById(username, id);
        }

        /// <summary>
        /// Creates or updates a recipe for a specified user
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="recipe">The recipe to be created or updated</param>
        public void Post(string username, Recipe recipe)
        {
            provider.SaveRecipe(username, recipe);
        }

        /// <summary>
        /// Creates or updates a recipe for a specified user
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="recipe">The recipe to be created or updated</param>
        public void Put(string username, Recipe recipe)
        {
            provider.SaveRecipe(username, recipe);
        }

        /// <summary>
        /// Deletes a recipe for a specified user
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="id">The id of the recipe to be deleted</param>
        public void Delete(string username, int id)
        {
            provider.DeleteRecipe(username, id);
        }
    }
}
