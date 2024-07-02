// models/Stories.js
const { booksDB } = require('../db/connection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the 'Stories' collection
const storySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  }
});

// Create the model for the 'Stories' collection
const Story = booksDB.model('Stories', storySchema, 'Stories');

module.exports = Story;
