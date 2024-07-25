// SocketMiddle.js
const jwt = require('jsonwebtoken');

const verifyToken = (socket, next) => {
    const token = socket.handshake.headers['auth-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(new Error('Authentication error'));
            socket.user = user;
            console.log("Token is successfully verified")
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
};

module.exports = verifyToken;
