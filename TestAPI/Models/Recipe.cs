using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public string Instructions { get; set; }
        public int PreparationTime { get; internal set; }
    }


    public class Ingredient
    {
        public string Name { get; set; }
        public double Quantity { get; set; }
    }
}