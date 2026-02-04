require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Ad = require('./models/Ad');
const connectDB = require('./config/db');

const seedAds = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Get first user from database
    let user = await User.findOne();
    
    if (!user) {
      // Create a demo user if none exists
      user = await User.create({
        firstName: 'Demo',
        lastName: 'Trader',
        email: 'demo@trader.com',
        phoneNumber: '+919876543210',
        password: 'hashed_password_demo',
        isVerified: true,
        rating: 4.8,
        completedTrades: 150,
        totalTrades: 155,
        paymentMethods: [
          { type: 'UPI', accountName: 'demo@upi', verified: true },
          { type: 'BANK', accountName: 'Demo Bank Account', verified: true }
        ],
      });
      console.log('Created demo user');
    }

    // Remove existing ads
    await Ad.deleteMany({});
    console.log('Cleared existing ads');

    // Create sample ads
    const sampleAds = [
      {
        advertiser: user._id,
        type: 'BUY',
        asset: 'USDT',
        fiatCurrency: 'INR',
        price: 83.5,
        minOrderAmount: 5000,
        maxOrderAmount: 100000,
        availableAmount: 50000,
        totalAmount: 50000,
        paymentMethods: ['UPI', 'BANK'],
        timeLimit: 15,
        terms: 'Please send payment within 15 minutes',
        isActive: true,
        createdAt: new Date(),
      },
      {
        advertiser: user._id,
        type: 'SELL',
        asset: 'USDT',
        fiatCurrency: 'INR',
        price: 84.0,
        minOrderAmount: 1000,
        maxOrderAmount: 50000,
        availableAmount: 25000,
        totalAmount: 25000,
        paymentMethods: ['UPI'],
        timeLimit: 20,
        terms: 'Please complete payment promptly',
        isActive: true,
        createdAt: new Date(),
      },
      {
        advertiser: user._id,
        type: 'BUY',
        asset: 'USDT',
        fiatCurrency: 'INR',
        price: 82.8,
        minOrderAmount: 10000,
        maxOrderAmount: 200000,
        availableAmount: 100000,
        totalAmount: 100000,
        paymentMethods: ['BANK', 'PAYTM'],
        timeLimit: 25,
        terms: 'Fast and reliable trader',
        isActive: true,
        createdAt: new Date(),
      },
      {
        advertiser: user._id,
        type: 'SELL',
        asset: 'USDT',
        fiatCurrency: 'INR',
        price: 85.5,
        minOrderAmount: 500,
        maxOrderAmount: 10000,
        availableAmount: 5000,
        totalAmount: 5000,
        paymentMethods: ['UPI', 'GOOGLEPAY'],
        timeLimit: 10,
        terms: 'Quick release, verified trader',
        isActive: true,
        createdAt: new Date(),
      },
      {
        advertiser: user._id,
        type: 'BUY',
        asset: 'USDT',
        fiatCurrency: 'INR',
        price: 83.0,
        minOrderAmount: 2000,
        maxOrderAmount: 50000,
        availableAmount: 30000,
        totalAmount: 30000,
        paymentMethods: ['UPI'],
        timeLimit: 15,
        terms: '100% trusted seller',
        isActive: true,
        createdAt: new Date(),
      },
    ];

    // Insert sample ads
    const createdAds = await Ad.insertMany(sampleAds);
    console.log(`Created ${createdAds.length} sample ads`);

    // Verify by fetching
    const allAds = await Ad.find().populate('advertiser', 'firstName lastName');
    console.log(`Total ads in database: ${allAds.length}`);
    console.log('Ads:', JSON.stringify(allAds, null, 2));

    console.log('Seed script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding ads:', error);
    process.exit(1);
  }
};

seedAds();
