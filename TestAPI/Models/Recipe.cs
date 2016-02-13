using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    /// <summary>
    /// Represents the recipe
    /// </summary>
    public class Recipe
    {
        /// <summary>
        /// Id of the recipe
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name of the recipe
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Source of the recipe
        /// </summary>
        public string Source { get; set; }

        /// <summary>
        /// Collection of ingredients needed for the recipe
        /// </summary>
        public List<Ingredient> Ingredients { get; set; }

        /// <summary>
        /// Instructions on how to prepare the recipe
        /// </summary>
        public string Instructions { get; set; }

        /// <summary>
        /// Time needed to prepare the recipe (in minutes)
        /// </summary>
        public int PreparationTime { get; internal set; }
    }

    /// <summary>
    /// Represents the individual ingredients of a recipe
    /// </summary>
    public class Ingredient
    {
        /// <summary>
        /// The name of the ingredient
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The quantity needed
        /// </summary>
        public double Quantity { get; set; }
    }
}