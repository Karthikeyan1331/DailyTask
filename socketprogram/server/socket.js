const { Server } = require("socket.io");
const { users, addUser, getUser, getUserByName, removeUser, getUsersInRoom, formatTimestamp } = require('./user');
const { messageSendReceive, globalMessageSender, messageReceived } = require('./controllers/ChatController');
const { lastSeenFun } = require("./controllers/LoginController")

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['POST', 'GET']
        }
    });

    io.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);

        socket.on('join', ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) return callback(error);

            socket.join(user.room);
            io.emit("onlinePeople", { users });
            socket.emit('message', { user: 'Info007', text: `${user.name}, welcome to room ${user.room}.` });
            socket.broadcast.to(user.room).emit('message', { user: 'Info007', text: `${user.name} has joined.` });
            messageReceived(name)
            callback();
        });
        socket.on('privateMessage', async ({ message: text, to, fileName }, callback) => {
            const user = getUser(socket.id);
            const recipient = getUserByName(to);
            const timestamp = new Date();
            let seenOrNot = 0
            if (user && recipient) {
                // Save message to database
                try {
                    const savedMessage = await messageSendReceive(user.name, recipient.name, text, 1, fileName);
                    io.to(recipient.id).emit('message', { user: user.name, text: text, timestamp: timestamp, fileName: fileName });
                    seenOrNot = 1
                } catch (error) {
                    console.error('Error saving message:', error);
                }
            }
            else {
                try {
                    const savedMessage = await messageSendReceive(user.name, to, text, 0);
                } catch (error) {
                    console.error('Error saving message:', error);
                }
            }
            callback(seenOrNot);
        });
        socket.on("Global", async (message) => {
            const user = getUser(socket.id);
            const timestamp = new Date();
            try {
                const savedMessage = await globalMessageSender(user.name, message, false);
                socket.broadcast.emit('message', { user: 'Global', text: message, timestamp: timestamp });

            } catch (error) {
                console.error('Error saving global message:', error);
            }
        });
        //Blue tick
        socket.on("seenMessageByReceiver", async ({ user, receiver }) => {
            try {
                const sender = getUserByName(user);
                // console.log(sender,"dksagkhdfjghldfj;gh",receiver,"end")
                if (sender) {
                    io.to(sender.id).emit('messageSeenByReceiver', { receiver });
                }
            } catch (error) {
                console.error('Error handling seenMessageByReceiver:', error);
            }
        });
        //BlueTick
        // socket.on("BlueTickValidate",(BlueTick)=>{
        //     console.log(BlueTick,"Hello")
        // })

        socket.on('disconnect', async () => {
            const user = removeUser(socket.id);
            if (user) {
                console.log(user.name, "Is disconnected")
                await lastSeenFun(user.name)
                io.to(user.room).emit('message', { user: 'Info007', text: `${user.name} has left.` });
                io.emit("onlinePeople", { users });
            }
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = initializeSocket;
