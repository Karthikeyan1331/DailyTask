const User = require('../models/userSchema');
const { use } = require('../route/login');


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ $or: [{ username: email }, { email }] });
        
        if (!user) {
            return res.status(404).json({ message: 'Username does not exist' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        user.online = true;
        await user.save();
        return res.status(200).json({ userData: user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

exports.lastSeenFun = async (email) => {
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
            return res.status(404).json({ message: "User not found" });
        }
        const lastSeen = user.lastSeen;
        res.status(200).json({ lastSeen });
    } catch (error) {
        console.error('Error fetching last seen date:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
