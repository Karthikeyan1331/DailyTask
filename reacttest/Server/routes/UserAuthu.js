const express = require('express');
const router = express.Router();
const upload = require('./fileUpload');
const User = require("../models/userSchema")
const fs = require('fs')

router.post('/Registration', upload.single('image'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const file = req.file;
        console.log('Received data:', username, email, password);
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            if (file) {
                fs.unlinkSync(file.path); // Delete the file synchronously
                fileDeleted = true;
            }
            return res.status(201).json({ message: 'Username already exists' });
        }

        // Check if email already exists
        existingUser = await User.findOne({ email });
        if (existingUser) {
            if (file) {
                fs.unlinkSync(file.path); // Delete the file synchronously
                fileDeleted = true;
            }
            return res.status(202).json({ message: 'Email already exists' });
        }
        if (!file) console.log("There is no Image")
        const newUser = new User({
            username,
            email,
            password,
            profile: file?.filename  // Store the filename in the profileImage field
        });

        // Save user to MongoDB
        const savedUser = await newUser.save();
        res.status(200).json({ message: 'Registration successful', user: savedUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});
router.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)

        // Check if username exists in either username or email field
        const email1 = await User.findOne({ email });
        const user = await User.findOne({ username: email });
        const user3 = await User.findOne({ $or: [{ username: email }, { email }] });
        if (!user && !email1) {
            return res.status(201).json({ message: 'Username not exists' });
        }

        // Check if password matches
        
        if (user3.password !== password) {
            return res.status(202).json({ message: 'Password is incorrect' });
        }

        // Update online status to true (if you have this field)
        user3.Online = true;
        await user3.save();

        // Respond with success
        res.status(200).json({ message: 'Login successful', user3 });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});


module.exports = router;
