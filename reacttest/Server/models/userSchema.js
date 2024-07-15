const { ChatApp } = require('../db/connection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: null
    },
    Online: {
        type: Boolean,
        default: true,
    }
});

// Create a model based on the schema
const User = ChatApp.model('User', userSchema, 'User');

module.exports = User;
