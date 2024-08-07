const Chats = require('../models/Message');
const User = require('../models/userSchema');
const Message = require("../models/TestMessage");

async function findUserIDWithName(name) {
    const id = await User.findOne({ email: name });
    console.log(id);
}

exports.messageSendReceive = async (sender, receiver, text, seen = 0, fileName) => {
    try {
        // Create a new message document
        const message = new Message({
            sender,
            receiver,
            text,
            doc: fileName,
            timestamp: new Date(),
            seen
        });
        console.log(fileName)
        // Save the message to the database
        await message.save();

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
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.globalMessageSender = async (sender, text, seen = false) => {
    console.log(sender, text, seen);

    try {
        const message = new Message({
            sender,
            receiver: "Global",
            text,
            timestamp: new Date(),
            seen
        });
        await message.save();
        return message;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};

exports.getMessage = async (req, res) => {
    try {
        const { user1: sender, user2: receiver } = req.body;
        await messageSeen(sender, receiver);

        if (!sender || !receiver) {
            return res.status(400).json({ message: 'Bad Request: Sender and receiver are required' });
        }

        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 });

        const formattedMessages = messages.map(({ sender, text, timestamp, doc, seen }) => ({
            sender,
            text,
            doc,
            timestamp,
            seen
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.messageReceived = async (email) => {
    try {
        const messages = await Message.find({
            receiver: email,
            seen: { $lt: 1 }
        });

        const updatePromises = messages.map(message => {
            if (message.seen < 1) {
                message.seen = 1;
                return message.save();
            }
        });

        await Promise.all(updatePromises);

        console.log('Messages updated successfully');
    } catch (error) {
        console.error('Error updating messages:', error);
        throw new Error('Error updating messages');
    }
};

async function messageSeen(email1, email2) {
    try {
        const result = await Message.updateMany(
            {
                $or: [
                    { sender: email1, receiver: email2 },
                    { sender: email2, receiver: email1 }
                ],
                sender: { $ne: email2 },
                seen: { $lt: 2 }
            },
            { $set: { seen: 2 } }
        );

        if (result.matchedCount > 0) {
            console.log(`${result.modifiedCount} messages updated.`);
        } else {
            console.log('No messages to update.');
        }
    } catch (error) {
        console.error('Error updating message seen status:', error);
        throw new Error('Error updating message seen status');
    }
}

exports.messageAllSeen = async (req, res) => {
    try {
        const { sender, receiver } = req.body;
        await messageSeen(sender, receiver);
        return res.status(200).json({ message: "Successful" });
    } catch (error) {
        console.error('Error updating message seen status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.fileUploadSuccessOrNot = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json("File is missing")
        }
        return res.status(201).json(file?.filename)
    }
    catch (error) {
        return res.status(500).json(error)
    }
}
const countdocumentfunction = async (receiver) => {
    const senderCounts = await Message.find(
        {
                receiver,
                seen: { $lt: 2 },
                sender: { $ne: receiver }
        },
    );

    // Extract the sender names from the unseen messages
    const senderNames = Object.entries(
        senderCounts
            .reduce((acc, { sender }) => ({ ...acc, [sender]: (acc[sender] || 0) + 1 }), {})
    ).map(([sender, count]) => ({ [sender]: count }));
    console.log(senderNames)
    return senderNames
}
exports.countMessageNotSeen = async (req, res) => {
    try {
        const receiver = req.params.userName;
        console.log(receiver, "djsgakljfhlksdj")
        let countOftheNotificationNotSeen = await countdocumentfunction(receiver)
        res.status(200).json( countOftheNotificationNotSeen );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
