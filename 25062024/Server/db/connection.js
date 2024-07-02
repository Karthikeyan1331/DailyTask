const mongoose = require('mongoose');
require('dotenv').config();

// Connection to the Books database
const booksDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: 'Books',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

booksDB.once('open', () => {
  console.log('Connected to the Books database');
});

// Connection to the FoodRecipeDB database
const foodRecipeDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: 'FoodRecipeDB',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

foodRecipeDB.once('open', () => {
  console.log('Connected to the FoodRecipeDB database');
});

module.exports = { booksDB, foodRecipeDB };
