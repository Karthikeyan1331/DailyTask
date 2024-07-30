// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const registrationController = require('./routes/Doctor');
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();
const connectDB = require("./connections/Books")
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', registrationController);
connectDB()
// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
