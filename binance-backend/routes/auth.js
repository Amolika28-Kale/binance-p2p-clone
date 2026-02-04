const express = require('express');
const router = express.Router();
const { signup, login, getCurrentUser, updateProfile, getUserById } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/user/:id', getUserById);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, updateProfile);

module.exports = router;
