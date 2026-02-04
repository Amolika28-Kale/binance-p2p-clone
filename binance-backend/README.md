# Binance P2P Backend

A complete Node.js/Express backend for the Binance P2P trading platform with MongoDB integration.

## Features

✅ User Authentication (Signup/Login with JWT)
✅ User Profiles & KYC Management
✅ P2P Trading Ads Management
✅ Real-time Trading Transactions
✅ Chat System for Traders
✅ Rating & Review System
✅ Payment Methods Management
✅ Complete CRUD Operations

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment:** dotenv

## Project Structure

```
binance-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── adController.js       # Ad management
│   └── tradeController.js    # Trade logic
├── models/
│   ├── User.js              # User schema
│   ├── Ad.js                # Trading ad schema
│   └── Trade.js             # Trade transaction schema
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.js              # Auth routes
│   ├── ads.js               # Ad routes
│   └── trades.js            # Trade routes
├── server.js                # Main server file
├── .env                     # Environment variables
├── package.json
└── API_DOCUMENTATION.md     # Complete API docs
```

## Installation

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 2. Clone & Setup

```bash
# Navigate to backend directory
cd binance-backend

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/binance-p2p

# JWT Secret (change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/binance-p2p?retryWrites=true&w=majority
```

### 4. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `GET /api/auth/user/:id` - Get public user info

### Trading Ads
- `GET /api/ads` - Get all ads with filters
- `GET /api/ads/:id` - Get single ad
- `POST /api/ads` - Create new ad (Protected)
- `PUT /api/ads/:id` - Update ad (Protected)
- `DELETE /api/ads/:id` - Delete ad (Protected)
- `GET /api/ads/user/my-ads` - Get my ads (Protected)

### Trades
- `POST /api/trades` - Create trade (Protected)
- `GET /api/trades/my-trades` - Get my trades (Protected)
- `GET /api/trades/:id` - Get trade details (Protected)
- `PUT /api/trades/:id/status` - Update trade status (Protected)
- `POST /api/trades/:id/message` - Add message (Protected)
- `POST /api/trades/:id/rate` - Rate user (Protected)

## Request Example

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Create Trading Ad
```bash
curl -X POST http://localhost:5000/api/ads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "SELL",
    "price": 91.50,
    "minOrderAmount": 500,
    "maxOrderAmount": 50000,
    "availableAmount": 50000,
    "paymentMethods": ["UPI", "BANK"],
    "timeLimit": 15,
    "fiatCurrency": "INR"
  }'
```

## Frontend Integration

Connect your React frontend to this backend:

```javascript
// utils/api.js
export const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  signup: (data) => 
    fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  login: (data) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  getCurrentUser: (token) =>
    fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(r => r.json())
};

// In React component
const handleLogin = async (email, password) => {
  const result = await authAPI.login({ email, password });
  localStorage.setItem('token', result.token);
  // Redirect to dashboard
};
```

## Database Models

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  phoneNumber: String,
  avatar: String,
  fiatCurrency: String (default: 'INR'),
  paymentMethods: Array,
  totalTrades: Number (default: 0),
  completedTrades: Number (default: 0),
  rating: Number (0-5, default: 5),
  isVerified: Boolean,
  kycStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Ad Model
```javascript
{
  advertiser: ObjectId (User reference),
  type: String ('BUY' or 'SELL'),
  asset: String (default: 'USDT'),
  fiatCurrency: String,
  price: Number,
  minOrderAmount: Number,
  maxOrderAmount: Number,
  availableAmount: Number,
  totalAmount: Number,
  paymentMethods: Array,
  timeLimit: Number (minutes),
  terms: String,
  isActive: Boolean,
  completedOrders: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Trade Model
```javascript
{
  ad: ObjectId (Ad reference),
  buyer: ObjectId (User reference),
  seller: ObjectId (User reference),
  amount: Number,
  price: Number,
  totalPrice: Number,
  paymentMethod: String,
  status: String,
  chatHistory: Array,
  buyerRating: Number,
  sellerRating: Number,
  buyerReview: String,
  sellerReview: String,
  expiresAt: Date,
  createdAt: Date,
  completedAt: Date
}
```

## CORS Configuration

The backend is configured to accept requests from `http://localhost:5174` (your React frontend).

To change the frontend URL, update in `server.js`:
```javascript
app.use(cors({
  origin: 'http://your-frontend-url:port',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Security Notes

⚠️ **Important for Production:**

1. **Change JWT_SECRET** - Use a strong, random secret
2. **Update CORS Origin** - Don't use localhost URLs in production
3. **Enable HTTPS** - Always use HTTPS in production
4. **MongoDB Authentication** - Use username/password for MongoDB
5. **Environment Variables** - Never commit `.env` to version control
6. **Rate Limiting** - Implement rate limiting for API endpoints
7. **Input Validation** - Validate all user inputs
8. **HTTPS Certificates** - Use proper SSL/TLS certificates

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill the process on port 5000

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update CORS origin in `server.js` to match your frontend URL

## Performance Optimization

- Add indexes to MongoDB collections
- Implement request caching
- Use pagination for large datasets
- Add request validation
- Implement API rate limiting
- Use connection pooling

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup MongoDB
3. ✅ Configure `.env` file
4. ✅ Start backend server
5. 🔄 Connect frontend to backend
6. 🔄 Implement WebSocket for real-time chat
7. 🔄 Add payment gateway integration
8. 🔄 Implement escrow system

## Support & Documentation

- Complete API docs: See `API_DOCUMENTATION.md`
- MongoDB docs: https://docs.mongodb.com
- Express docs: https://expressjs.com
- JWT info: https://jwt.io

## License

MIT License

---

**Happy Trading! 🚀**
