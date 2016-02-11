using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestAPI.Models;
using TestAPI.Providers;

namespace TestAPI.Controllers
{
    public class RecipesController : ApiController
    {
        RecipeProvider provider = new RecipeProvider();

        public RecipesController()
        {

        }

        public IEnumerable<Recipe> Get(string username)
        {
            return provider.GetRecipesForUser(username);
        }

        [Route("reset/{username}")]
        public bool Reset(string username)
        {
            return provider.ResetRecipes(username); ;
        }

        // GET api/values/5
        public Recipe Get(string username, int id)
        {
            return provider.GetRecipeById(username, id);
        }

        // POST api/values
        public void Post(string username, Recipe recipe)
        {
            provider.SaveRecipe(username, recipe);
        }

        // PUT api/values/5
        public void Put(string username, Recipe recipe)
        {
            provider.SaveRecipe(username, recipe);
        }

        // DELETE api/values/5
        public void Delete(string username, int id)
        {
            provider.DeleteRecipe(username, id);
        }
    }
}
