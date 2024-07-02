
const { booksDB } = require('../db/connection');
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
    specialty: {
        type: String,
        required: true
    },
    // Add other fields as necessary
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Doctor = booksDB.model('Doctor', doctorSchema, 'Doctor');

module.exports = Doctor;
