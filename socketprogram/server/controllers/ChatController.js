const Chats = require('../models/Message');
const User = require('../models/userSchema');

async function findUserIDWithName(name) {
    const id = await User.findOne({ email: name });
    console.log(id)

}
exports.messageSendReceive = async (sender, receiver, text, seen = 0) => {
    try {
        let chat = await Chats.findOne({ user1: sender, user2: receiver });

        if (!chat) {
            chat = await Chats.findOne({ user1: receiver, user2: sender });
        }

        if (!chat) {
            chat = new Chats({
                user1: sender,
                user2: receiver,
                messages: []
            });
        }
        const message = {
            sender: sender,
            text: text,
            timestamp: new Date(),
            seen: seen
        };
        chat.messages.push(message);
        await chat.save();

        return message;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users" });
    }
};
exports.globalMessageSender = async (sender, text, seen = false) => {
    console.log(sender, text, seen = false)
    try {
        let chat = await Chats.findOne({ user1: "Global", user2: "Global" });

        if (!chat) {
            chat = await Chats.findOne({ user1: "Global", user2: "Global" });
        }

        if (!chat) {
            chat = new Chats({
                user1: "Global",
                user2: "Global",
                messages: []
            });
        }
        const message = {
            sender: sender,
            text: text,
            timestamp: new Date(),
            seen: seen
        };
        chat.messages.push(message);
        await chat.save();

        return message;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
}
exports.getMessage = async (req, res) => {
    const { user1, user2 } = req.body;
    // console.log(user1, user2, "her")
    await messageSeen(user1, user2)
    try {
        // Find the chat between the two users
        let chat = await Chats.findOne({ user1, user2 });

        if (!chat) {
            chat = await Chats.findOne({ user1: user2, user2: user1 });
        }

        if (!chat) {
            return res.status(201).json({ message: "No conversation found between the users." });
        }

        res.status(200).json(chat.messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.messageReceived = async (email) => {

    try {
        let chats = await Chats.find({
            $or: [{ user1: email }, { user2: email }]
        });
        for (let chat of chats) {
            let isUpdated = false;
            chat.messages.forEach(message => {
                if (message.sender !== email && message.seen < 1) {
                    message.seen = 1;
                    isUpdated = true;
                }
            });
            if (isUpdated) {
                await chat.save();
            }
        }
    } catch (error) {
        console.error('Error updating messages:', error);
        throw new Error('Error updating messages');
    }
}
async function messageSeen(email1, email2) {
    let chat = await Chats.findOne({ user1: email1, user2: email2 });
    if (!chat) {
        chat = await Chats.findOne({ user1: email2, user2: email1 });
    }
    if (chat) {
        chat.messages.forEach(message => {
            if ((message.sender !== email2 || email1 == email2) && message.seen <= 1) {
                
                message.seen = 2;
            }
        });
        await chat.save();
    }
}