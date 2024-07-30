const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema, 'Doctor');

module.exports = Doctor;
