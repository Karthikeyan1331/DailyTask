const express = require("express");
const app = express();
const http = require("http");
const path = require('path');
const cors = require('cors');
const loginRoute = require("./route/login");
const ChatRoute = require("./route/Chat")
const Testing = require("./Testing/testing")
require('dotenv').config();

const initializeSocket = require("./socket");

app.use(cors());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', loginRoute);
app.use('/', ChatRoute);
app.use("/", Testing)

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Initialize Socket.IO
initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});
