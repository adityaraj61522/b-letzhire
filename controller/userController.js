const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { invalidateToken, isTokenInvalidated } = require('../middlewares/auth');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.log("error",error)
        res.status(500).send({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the current password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid current password' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        // Save the updated user
        await user.save();

        res.send({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.logout = (req, res) => {
    if (isTokenInvalidated(req.token)) {
        return res.status(400).send({ message: 'Token has already been invalidated' });
    }
    invalidateToken(req.token);
    res.status(200).send({ message: 'Logged out successfully' });
};

