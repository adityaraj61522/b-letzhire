const express = require('express');
// const { registerUser, loginUser, getUserProfile,resetPassword } = require('../controller/userController');
const userController = require('../controller/userController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);
router.post('/reset-password', userController.resetPassword);
router.post('/logout', auth, userController.logout);

module.exports = router;
