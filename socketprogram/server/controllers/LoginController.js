const User = require('../models/userSchema');
const { use } = require('../route/login');

//Create a new doctor
exports.loginUser = async (req, res) => {
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
        // const token = generateAuthToken(user3);

        // Send the token in the response
        res.status(200).json({ userData: user3 });

        // Respond with success
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

exports.lastSeen = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        user.lastSeen = new Date();
        await user.save();
        console.log(`Last seen date updated for user: ${email}`);
    } catch (error) {
        console.error('Error updating last seen date:', error.message);
    }
};

exports.getLastSeen = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status("201").json({ message: "User is not found" })
        }
        let lastSeen = user.lastSeen
        await user.save()
        res.status("200").json({ lastSeen })
    }
    catch (error) {
        console.log(error)
        res.status("500").json({ error })
    }
}