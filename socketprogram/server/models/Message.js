
const { ChatApp } = require('../db/connection');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    seen: { type: Number, default: 0 }
});

const chatSchema = new mongoose.Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    messages: [messageSchema]
});

// Create a model based on the schema
const Message = ChatApp.model('Message', chatSchema, 'Message');

module.exports = Message;
