const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'BANK', 'PAYTM', 'GOOGLEPAY'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAYMENT_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'DISPUTED'],
    default: 'PENDING'
  },
  buyerMessage: String,
  sellerMessage: String,
  chatHistory: [{
    sender: mongoose.Schema.Types.ObjectId,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  buyerRating: {
    type: Number,
    min: 1,
    max: 5
  },
  sellerRating: {
    type: Number,
    min: 1,
    max: 5
  },
  buyerReview: String,
  sellerReview: String,
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Trade', tradeSchema);
