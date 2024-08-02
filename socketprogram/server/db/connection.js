const mongoose = require('mongoose');
require('dotenv').config();

// Connection to the Books database
const ChatApp = mongoose.createConnection(process.env.MONGODB_URI, {
  dbName: 'ChatApp',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

ChatApp.once('open', () => {
  console.log('Connected to the ChatApp database');
});
module.exports = {ChatApp};