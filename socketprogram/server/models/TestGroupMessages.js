const mongoose = require('mongoose');
const { Schema } = mongoose;
const GroupMessageSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    message: [{
        sender: { type: String, required: true },
        content: { type: String, default: "" },
        doc: { type: String, default: null },
        seen: {
            type: Map,
            of: Number,
            default: {}
        },
        timestamp: { type: Date, default: Date.now, expires: '30d' }
    }],
    time: { type: Date, default: Date.now }
});
const GroupMessage = mongoose.model('TestGroupMessage', GroupMessageSchema, 'TestGroupMessage');

module.exports = GroupMessage;