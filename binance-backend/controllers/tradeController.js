const Trade = require('../models/Trade');
const Ad = require('../models/Ad');
const User = require('../models/User');

// Updated controllers/tradeController.js
exports.createTrade = async (req, res) => {
  try {
    const { adId, amount, paymentMethod } = req.body;

    if (!adId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const ad = await Ad.findById(adId);
    if (!ad || !ad.isActive) {
      return res.status(400).json({ success: false, message: 'This advertisement is no longer active' });
    }

    // Convert everything to Numbers to prevent string comparison errors
    const tradeAmountQuantity = Number(amount);
    const adPrice = Number(ad.price);
    const minLimit = Number(ad.minOrderAmount);
    const maxLimit = Number(ad.maxOrderAmount);

    // Calculate total fiat value
    const totalFiatValue = tradeAmountQuantity * adPrice;

    // Buffer of 0.01 to handle JS floating point precision issues
    if (totalFiatValue < (minLimit - 0.01) || totalFiatValue > (maxLimit + 0.01)) {
      return res.status(400).json({ 
        success: false, 
        message: `Amount must be between ${minLimit} and ${maxLimit}` 
      });
    }

    if (tradeAmountQuantity > Number(ad.availableAmount)) {
      return res.status(400).json({ success: false, message: 'Insufficient quantity available' });
    }

    const buyer = ad.type === 'SELL' ? req.userId : ad.advertiser.toString();
    const seller = ad.type === 'BUY' ? req.userId : ad.advertiser.toString();

    if (buyer === seller) {
      return res.status(400).json({ success: false, message: 'You cannot trade with yourself' });
    }

    const trade = new Trade({
      ad: adId,
      buyer,
      seller,
      amount: tradeAmountQuantity,
      price: adPrice,
      totalPrice: totalFiatValue,
      paymentMethod,
      expiresAt: new Date(Date.now() + ad.timeLimit * 60000)
    });

    // Escrow Lock: Deduct quantity from Ad immediately
    ad.availableAmount -= tradeAmountQuantity;
    if (ad.availableAmount <= 0.001) ad.isActive = false;
    
    await ad.save();
    await trade.save();

    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email phoneNumber');

    res.status(201).json({ success: true, trade: populatedTrade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

// controllers/tradeController.js मध्ये बदल करा

// Update trade status (Payment Notification & Asset Release)
// Update trade status (Payment Notification & Asset Release)
exports.updateTradeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trade = await Trade.findById(req.params.id);

    if (!trade) return res.status(404).json({ success: false, message: 'Trade not found' });
    if (trade.status === 'COMPLETED' || trade.status === 'CANCELLED') {
        return res.status(400).json({ message: "Trade is already finalized" });
    }

    // 1. Buyer marks as 'PAYMENT_SENT'
    if (status.toUpperCase() === 'PAYMENT_SENT') {
      if (trade.buyer.toString() !== req.userId) return res.status(403).json({ message: 'Only buyer can mark as paid' });
      trade.status = 'PAYMENT_SENT';
    }

    // 2. Seller marks as 'COMPLETED' (Atomic Balance Transfer)
    if (status.toUpperCase() === 'COMPLETED') {
      if (trade.seller.toString() !== req.userId) return res.status(403).json({ message: 'Only seller can release assets' });

      // Move funds to buyer wallet and update trade counts in ONE step
      await User.findByIdAndUpdate(trade.buyer, { 
        $inc: { walletBalance: trade.amount, completedTrades: 1 } 
      });
      await User.findByIdAndUpdate(trade.seller, { 
        $inc: { completedTrades: 1 } 
      });

      trade.status = 'COMPLETED';
      trade.completedAt = Date.now();
    }

    // 3. Trade 'CANCELLED' (Return funds to Ad)
    if (status.toUpperCase() === 'CANCELLED') {
      await Ad.findByIdAndUpdate(trade.ad, { $inc: { availableAmount: trade.amount }, isActive: true });
      trade.status = 'CANCELLED';
    }

    await trade.save();
    res.status(200).json({ success: true, trade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add message to chat history
exports.addMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const trade = await Trade.findById(req.params.id);

    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    trade.chatHistory.push({
      sender: req.userId,
      message,
      timestamp: Date.now()
    });

    await trade.save();
    const populatedTrade = await trade.populate('buyer seller', 'firstName lastName email');

    res.status(200).json({ success: true, trade: populatedTrade });
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
