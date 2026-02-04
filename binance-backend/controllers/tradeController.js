const Trade = require('../models/Trade');
const Ad = require('../models/Ad');
const User = require('../models/User');

// Create trade (initiate order)
exports.createTrade = async (req, res) => {
  try {
    const { adId, amount, paymentMethod } = req.body;

    if (!adId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (!ad.isActive) {
      return res.status(400).json({ message: 'Ad is no longer active' });
    }

    if (amount < ad.minOrderAmount || amount > ad.maxOrderAmount) {
      return res.status(400).json({ message: `Amount must be between ${ad.minOrderAmount} and ${ad.maxOrderAmount}` });
    }

    if (amount > ad.availableAmount) {
      return res.status(400).json({ message: 'Insufficient available amount' });
    }

    const buyer = ad.type === 'SELL' ? req.userId : ad.advertiser.toString();
    const seller = ad.type === 'BUY' ? req.userId : ad.advertiser.toString();

    if (buyer === seller) {
      return res.status(400).json({ message: 'Cannot trade with yourself' });
    }

    const totalPrice = amount * ad.price;
    const expiresAt = new Date(Date.now() + ad.timeLimit * 60000);

    const trade = new Trade({
      ad: adId,
      buyer,
      seller,
      amount,
      price: ad.price,
      totalPrice,
      paymentMethod,
      expiresAt
    });

    await trade.save();

    // Reduce available amount in ad
    ad.availableAmount -= amount;
    if (ad.availableAmount === 0) {
      ad.isActive = false;
    }
    await ad.save();

    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email phoneNumber');

    res.status(201).json({
      success: true,
      message: 'Trade initiated successfully',
      trade: populatedTrade
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trades for current user
exports.getMyTrades = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = {
      $or: [{ buyer: req.userId }, { seller: req.userId }]
    };

    if (status) query.status = status.toUpperCase();

    const skip = (page - 1) * limit;
    const trades = await Trade.find(query)
      .populate('buyer seller', 'firstName lastName email')
      .populate('ad')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Trade.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      trades
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trade by ID
exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)
      .populate('buyer seller', 'firstName lastName email phoneNumber paymentMethods')
      .populate('ad');

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    // Check authorization
    if (trade.buyer.toString() !== req.userId && trade.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this trade' });
    }

    res.status(200).json({
      success: true,
      trade
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update trade status
exports.updateTradeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    if (trade.buyer.toString() !== req.userId && trade.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this trade' });
    }

    trade.status = status.toUpperCase();

    if (status.toUpperCase() === 'COMPLETED') {
      trade.completedAt = Date.now();
      
      // Update user stats
      const buyer = await User.findById(trade.buyer);
      const seller = await User.findById(trade.seller);
      
      buyer.completedTrades += 1;
      seller.completedTrades += 1;
      
      await buyer.save();
      await seller.save();
    }

    await trade.save();

    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Trade status updated successfully',
      trade: populatedTrade
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add message to chat
exports.addMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    if (trade.buyer.toString() !== req.userId && trade.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to message in this trade' });
    }

    trade.chatHistory.push({
      sender: req.userId,
      message,
      timestamp: Date.now()
    });

    await trade.save();

    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      trade: populatedTrade
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rate user
exports.rateUser = async (req, res) => {
  try {
    const { rating, review, isForBuyer } = req.body;

    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    if (trade.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Can only rate completed trades' });
    }

    if (isForBuyer) {
      if (trade.seller.toString() !== req.userId) {
        return res.status(403).json({ message: 'Only seller can rate buyer' });
      }
      trade.buyerRating = rating;
      trade.buyerReview = review;
    } else {
      if (trade.buyer.toString() !== req.userId) {
        return res.status(403).json({ message: 'Only buyer can rate seller' });
      }
      trade.sellerRating = rating;
      trade.sellerReview = review;
    }

    await trade.save();

    // Update user rating
    const ratedUserId = isForBuyer ? trade.buyer : trade.seller;
    const user = await User.findById(ratedUserId);
    
    // Calculate average rating
    const trades = await Trade.find({
      $or: [
        { buyer: ratedUserId, sellerRating: { $exists: true, $ne: null } },
        { seller: ratedUserId, buyerRating: { $exists: true, $ne: null } }
      ]
    });

    const totalRating = trades.reduce((sum, t) => {
      if (t.buyer.toString() === ratedUserId.toString()) {
        return sum + (t.sellerRating || 0);
      } else {
        return sum + (t.buyerRating || 0);
      }
    }, rating);

    user.rating = totalRating / (trades.length + 1);
    await user.save();

    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Rating submitted successfully',
      trade: populatedTrade
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
