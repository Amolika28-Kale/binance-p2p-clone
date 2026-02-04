const express = require('express');
const router = express.Router();
const { createTrade, getMyTrades, getTradeById, updateTradeStatus, addMessage, rateUser } = require('../controllers/tradeController');
const auth = require('../middleware/auth');

// All trade routes require authentication
router.post('/', auth, createTrade);
router.get('/my-trades', auth, getMyTrades);
router.get('/:id', auth, getTradeById);
router.put('/:id/status', auth, updateTradeStatus);
router.post('/:id/message', auth, addMessage);
router.post('/:id/rate', auth, rateUser);

module.exports = router;
