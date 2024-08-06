const { ChatApp } = require('../db/connection');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    text: { type: String, default: "" },
    doc: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
    seen: { type: Number, default: 0 }
});
messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

const Message = ChatApp.model('TestMessage', messageSchema, 'TestMessage');
module.exports = Message;