const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the GroupMessage schema
const GroupMessageSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // TTL index will be based on this field
    seenBy: [{
        email: { type: String, required: true },
        typeSeen: { type: Number, enum: [0, 1, 2] }
    }]
});

// Create TTL index on the `timestamp` field with a 30-day expiration time
// GroupMessageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema, 'GroupMessage');

module.exports = GroupMessage;
