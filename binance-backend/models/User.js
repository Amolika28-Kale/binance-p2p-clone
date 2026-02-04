const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  firstName: {
    type: String,
    required: [true, 'Please provide first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name']
  },
  phoneNumber: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  fiatCurrency: {
    type: String,
    default: 'INR'
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['UPI', 'BANK', 'PAYTM', 'GOOGLEPAY'],
    },
    accountName: String,
    accountNumber: String,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  totalTrades: {
    type: Number,
    default: 0
  },
  completedTrades: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
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

// Hash password before saving
const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
