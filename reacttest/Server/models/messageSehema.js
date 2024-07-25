const { ChatApp } = require('../db/connection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the message schema
const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const Message = ChatApp.model('Message', messageSchema, 'Message');

module.exports = Message;
