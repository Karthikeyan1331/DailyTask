// messageService.js

const verifyToken = require('../db/SocketMiddle');
const Message = require('../models/messageSehema');
const User = require('../models/userSchema');
const {Server}=require("socket.io")

// Function to save a new message
const saveMessage = async (senderId, receiverId, messageText) => {
    try {
        const message = new Message({
            sender: senderId,
            receiver: receiverId,
            text: messageText
        });

        await message.save();
        console.log('Message saved successfully:', message);
    } catch (error) {
        console.error('Error saving message:', error);
    }
};
const setupWebSocket = (server) => {
    console.log("Getting into the Socket program")
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);
        socket.on('send_message', (message) => {
            socket.broadcast.emit("recieve_message")
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = setupWebSocket;
