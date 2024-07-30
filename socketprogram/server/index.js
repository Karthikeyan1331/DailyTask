const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require('cors')
app.use(cors())
const server = http.createServer(app)
const PORT = 8000
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['POST', 'GET']
    }
})
io.on('connection', (socket) => {
    console.log("User connected with", socket.id)
    socket.on('join_room', (data) => {
        socket.join(data)
    })
    socket.on('send_message', (data) => {
        console.log(data)
        if (data.room !== '')
            socket.to(data.room).emit("message_receive", data)
        else
            socket.broadcast.emit("message_receive", data)
    })
})
server.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`)
})