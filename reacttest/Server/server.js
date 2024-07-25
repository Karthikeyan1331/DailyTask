// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const registrationController = require('./routes/UserAuthu');
const setupWebSocket = require('./routes/messageService'); // Import the WebSocket handler

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupWebSocket(server);
app.use('/', registrationController);

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
