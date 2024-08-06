const express = require('express');
const router = express.Router();
const TestMessage = require('../models/TestMessage'); // Import the Mongoose model
const MessagesStoreMy = require("../models/Message")
const { faker } = require('@faker-js/faker'); // Import Faker for generating random text]
const {BSON} = require("bson")

async function getDocumentSize() {
    try {
        const doc = await MessagesStoreMy.findById("66add66e774067bfce9bac33").lean();
        const sizeInBytes = BSON.calculateObjectSize(doc);
        const sizeInMB = sizeInBytes / (1024 * 1024);

        console.log("Size in Bytes:", sizeInBytes);
        console.log("Size in MB:", sizeInMB);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // mongoose.connection.close();
    }
}
getDocumentSize()
// POST route to store 100 test messages
router.post('/storeTested', async (req, res) => {
    try {
        const sender = 'karthikeyan';
        const receiver = 'monesh';
        const numberOfMessages = 1000000;

        const messages = Array.from({ length: numberOfMessages }, () => ({
            sender,
            receiver,
            text: faker.lorem.sentence()
        }));

        // Save all messages to the database
        await TestMessage.insertMany(messages);

        // Send a success response
        res.status(201).json({ message: `${numberOfMessages} messages stored successfully.` });
    } catch (error) {
        // Handle any errors
        console.error('Error storing messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/getTestData', async (req, res) => {
    try {
        const sender = 'karthikeyan';
        const receiver = 'monesh';

        // Find messages based on the sender and receiver
        const messages = await TestMessage.find({ sender, receiver }).sort({timestamp:-1}).limit(20)

        // Send the retrieved messages as a response
        res.status(200).json(messages);
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


//Myy storage


router.post('/storeMyData', async (req, res) => {
    try {
        const sender = 'karthikeyan';
        const receiver = 'monesh';
        const numberOfMessages = 1000000;
        let chat = new MessagesStoreMy({ user1: sender, user2: receiver, messages: [] });
        for (let j = 0; j < numberOfMessages; j++) {
            chat.messages.push({
                sender,
                text: faker.lorem.sentence()
            });
        }
        await chat.save();

        // Send a success response
        res.status(201).json({ message: `${numberOfMessages} messages stored successfully.` });
    } catch (error) {
        // Handle any errors
        console.error('Error storing messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
