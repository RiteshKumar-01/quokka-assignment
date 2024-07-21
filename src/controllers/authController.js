const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

module.exports = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = await User.create({ username, email, password });

            res.status(201).json({
                message: "User registered successfully",
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                res.json({
                    message: "Login successfully",
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server error' });
        }
    }
}
