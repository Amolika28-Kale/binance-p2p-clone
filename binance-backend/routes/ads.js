const express = require('express');
const router = express.Router();
const { getAds, getAdById, createAd, updateAd, deleteAd, getMyAds } = require('../controllers/adController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getAds);
router.get('/:id', getAdById);

// Protected routes
router.post('/', auth, createAd);
router.put('/:id', auth, updateAd);
router.delete('/:id', auth, deleteAd);
router.get('/user/my-ads', auth, getMyAds);

module.exports = router;
