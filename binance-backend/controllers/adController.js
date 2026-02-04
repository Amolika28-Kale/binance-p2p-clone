const Ad = require('../models/Ad');
const User = require('../models/User');

// Get all ads with filters
exports.getAds = async (req, res) => {
  try {
    const { type, fiatCurrency, paymentMethod, minAmount, maxAmount, page = 1, limit = 20 } = req.query;

    let query = { isActive: true };

    if (type) query.type = type.toUpperCase();
    if (fiatCurrency) query.fiatCurrency = fiatCurrency;
    if (paymentMethod) query.paymentMethods = paymentMethod;

    if (minAmount || maxAmount) {
      query.minOrderAmount = { $lte: maxAmount || 999999 };
      query.maxOrderAmount = { $gte: minAmount || 0 };
    }

    const skip = (page - 1) * limit;
    const ads = await Ad.find(query)
      .populate('advertiser', 'firstName lastName rating completedTrades totalTrades isVerified')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Ad.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      ads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single ad
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('advertiser', 'firstName lastName rating completedTrades totalTrades isVerified phoneNumber paymentMethods');

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    res.status(200).json({
      success: true,
      ad
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create ad
exports.createAd = async (req, res) => {
  try {
    const { type, price, minOrderAmount, maxOrderAmount, availableAmount, paymentMethods, timeLimit, terms, fiatCurrency } = req.body;

    if (!type || !price || !minOrderAmount || !maxOrderAmount || !availableAmount) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const ad = new Ad({
      advertiser: req.userId,
      type: type.toUpperCase(),
      price,
      minOrderAmount,
      maxOrderAmount,
      availableAmount,
      totalAmount: availableAmount,
      paymentMethods,
      timeLimit: timeLimit || 15,
      terms: terms || '',
      fiatCurrency: fiatCurrency || 'INR'
    });

    await ad.save();

    res.status(201).json({
      success: true,
      message: 'Ad created successfully',
      ad
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ad
exports.updateAd = async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.advertiser.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this ad' });
    }

    const { price, minOrderAmount, maxOrderAmount, availableAmount, paymentMethods, timeLimit, terms, isActive } = req.body;

    if (price) ad.price = price;
    if (minOrderAmount) ad.minOrderAmount = minOrderAmount;
    if (maxOrderAmount) ad.maxOrderAmount = maxOrderAmount;
    if (availableAmount !== undefined) ad.availableAmount = availableAmount;
    if (paymentMethods) ad.paymentMethods = paymentMethods;
    if (timeLimit) ad.timeLimit = timeLimit;
    if (terms) ad.terms = terms;
    if (isActive !== undefined) ad.isActive = isActive;

    ad.updatedAt = Date.now();
    await ad.save();

    res.status(200).json({
      success: true,
      message: 'Ad updated successfully',
      ad
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ad
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.advertiser.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this ad' });
    }

    await Ad.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Ad deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my ads
exports.getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ advertiser: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ads.length,
      ads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
