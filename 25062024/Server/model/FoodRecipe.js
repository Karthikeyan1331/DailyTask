const { foodRecipeDB } = require('../db/connection'); // Import the foodRecipeDB connection
const mongoose = require('mongoose');

// Define the schema for the Masala Karela Recipe in the 'FoodRecipeDB' database
const FoodRecipe = new mongoose.Schema({
  TranslatedRecipeName: String,
  TranslatedIngredients: String,
  PrepTimeInMins: Number,
  CookTimeInMins: Number,
  TotalTimeInMins: Number,
  Servings: Number,
  Cuisine: String,
  Course: String,
  Diet: String,
  TranslatedInstructions: String,
  URL: String,
  Image: String
});

// Create a model for the Masala Karela Recipe in the 'FoodRecipeDB' database
const MasalaKarela = foodRecipeDB.model('FoodRecipe', FoodRecipe, 'FoodRecipe');

module.exports = MasalaKarela;
