const mongoose = require('mongoose');
const { Schema } = mongoose;


const MemberSchema = new Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['member', 'admin'] }
});


const GroupSchema = new Schema({
    groupName: { type: String, required: true },
    members: [MemberSchema],
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true }
});

const Group = mongoose.model('Group', GroupSchema, 'Group');
module.exports = Group;