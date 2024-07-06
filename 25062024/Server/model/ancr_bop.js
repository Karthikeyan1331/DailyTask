const { booksDB } = require('../db/connection');
const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  doctorname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  complain:{
    type: String,
    required: true,
  },
  location: {
    type: String
  }
});

const Appointment = booksDB.model('Appointment', AppointmentSchema);

module.exports = Appointment;
