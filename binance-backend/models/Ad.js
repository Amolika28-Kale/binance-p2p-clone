const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  asset: {
    type: String,
    default: 'USDT'
  },
  fiatCurrency: {
    type: String,
    default: 'INR'
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  minOrderAmount: {
    type: Number,
    required: [true, 'Please provide minimum order amount']
  },
  maxOrderAmount: {
    type: Number,
    required: [true, 'Please provide maximum order amount']
  },
  availableAmount: {
    type: Number,
    required: [true, 'Please provide available amount']
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethods: [{
    type: String,
    enum: ['UPI', 'BANK', 'PAYTM', 'GOOGLEPAY']
  }],
  timeLimit: {
    type: Number,
    default: 15 // minutes
  },
  terms: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completedOrders: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ad', adSchema);
