# Binance P2P Full Stack Setup and Running Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager

---

## Step 1: Setup Backend

### 1.1 Install Backend Dependencies
```bash
cd binance-backend
npm install
```

### 1.2 Configure Environment Variables
Create/verify `.env` file in `binance-backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/binance-p2p
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### 1.3 Ensure MongoDB is Running
**On Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or manually start MongoDB Server:
mongod
```

**On macOS:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

### 1.4 Start Backend Server
```bash
cd binance-backend
npm run dev
```

Expected output:
```
> nodemon server.js
[nodemon] 3.1.11
Server running on port 5000
```

---

## Step 2: Setup Frontend

### 2.1 Install Frontend Dependencies
```bash
cd binance-ui
npm install
```

### 2.2 Start Frontend Development Server
```bash
cd binance-ui
npm run dev
```

Expected output:
```
  VITE v5.4.21  ready in XXX ms
  ➜  Local:   http://localhost:5175/
```

---

## System Architecture

```
Frontend (Port 5175)
    ↓
    ↓ HTTP/REST API (Bearer Token Auth)
    ↓
Backend (Port 5000)
    ↓
    ↓ Mongoose ODM
    ↓
MongoDB (Port 27017)
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Advertisements
- `GET /api/ads` - Get all ads with filters
- `GET /api/ads/:id` - Get single ad
- `POST /api/ads` - Create new ad (protected)
- `PUT /api/ads/:id` - Update ad (protected)
- `DELETE /api/ads/:id` - Delete ad (protected)
- `GET /api/ads/my-ads` - Get user's ads (protected)

### Trades
- `POST /api/trades` - Initiate trade (protected)
- `GET /api/trades` - Get user's trades (protected)
- `GET /api/trades/:id` - Get trade details (protected)
- `PUT /api/trades/:id/status` - Update trade status (protected)
- `POST /api/trades/:id/message` - Add chat message (protected)
- `POST /api/trades/:id/rate` - Rate user (protected)

---

## Frontend Components

### Pages
- **LoginPage** - User login with email/password
- **SignupPage** - User registration with validation
- **P2PPage** - Main trading page with ads listing
- **LandingPage** - Home page (if exists)

### Features
- ✅ Authentication (JWT tokens stored in localStorage)
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Real-time ads fetching from backend
- ✅ Filter ads by type (Buy/Sell), payment method, amount
- ✅ Global auth state management (AuthContext)
- ✅ Error handling and loading states
- ✅ Material-UI components with custom theming
- ✅ Tailwind CSS styling

---

## Testing the Integration

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/api/health
```

### Test 2: Create User (Signup)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Test@1234"
  }'
```

### Test 3: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test@1234"
  }'
```

### Test 4: Access Frontend
- Open browser: `http://localhost:5175`
- Click "Sign up" → Create account
- Click "Log In" → Login with credentials
- View P2P ads page

---

## Troubleshooting

### MongoDB Connection Error
- **Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`
- **Solution:** 
  - Ensure MongoDB is running: `mongod`
  - Check MongoDB URI in `.env`
  - On Windows: Install MongoDB Community Edition from official website

### CORS Error in Browser Console
- **Problem:** `Access to XMLHttpRequest blocked by CORS`
- **Solution:**
  - Verify backend is running on port 5000
  - Check CORS configuration in `server.js`
  - Clear browser cache and restart dev server

### Port Already in Use
- **Problem:** `Error: listen EADDRINUSE :::5000`
- **Solution:**
  - Find process using port: `lsof -i :5000` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)
  - Kill process or change PORT in `.env`

### Module Not Found
- **Problem:** `Error: Cannot find module 'express'`
- **Solution:** Run `npm install` in the respective directory (backend or frontend)

### Token Invalid/Expired
- **Problem:** `401 Unauthorized`
- **Solution:**
  - Clear localStorage: Open DevTools → Storage → Clear all
  - Login again to get fresh token

---

## Production Deployment

### Before Deploying:
1. Update `JWT_SECRET` in `.env` with strong key
2. Set `NODE_ENV=production`
3. Update CORS origin to production domain
4. Verify MongoDB connection string (use MongoDB Atlas for cloud)
5. Build frontend: `npm run build`

### Deployment Services:
- **Backend:** Heroku, Railway, Render, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (free tier available)

---

## Project Structure

```
binance/
├── binance-backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── binance-ui/
│   ├── src/
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   ├── utils/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── SETUP_AND_RUN.md
```

---

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 5175
3. ✅ MongoDB connected
4. ✅ API endpoints working
5. 📋 Create sample ads via API or admin panel
6. 📋 Test buy/sell functionality
7. 📋 Implement payment integration
8. 📋 Add WebSocket for real-time updates
9. 📋 Deploy to production

---

**Happy Trading! 🚀**
