# Binance P2P Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Sign Up
**POST** `/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "rating": 4.8,
    "completedTrades": 45,
    "totalTrades": 50
  }
}
```

---

### 3. Get Current User
**GET** `/auth/me` (Protected)

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+91988..."
    "fiatCurrency": "INR",
    "rating": 4.8,
    "completedTrades": 45,
    "totalTrades": 50,
    "isVerified": true,
    "kycStatus": "verified",
    "paymentMethods": [...]
  }
}
```

---

### 4. Update Profile
**PUT** `/auth/profile` (Protected)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+919876543210",
  "fiatCurrency": "INR",
  "paymentMethods": [
    {
      "type": "UPI",
      "accountName": "john@upi",
      "verified": true
    }
  ]
}
```

---

### 5. Get User by ID
**GET** `/auth/user/:id`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "rating": 4.8,
    "completedTrades": 45,
    "totalTrades": 50,
    "isVerified": true
  }
}
```

---

## Ads Endpoints

### 1. Get All Ads
**GET** `/ads`

**Query Parameters:**
- `type` (optional): 'BUY' or 'SELL'
- `fiatCurrency` (optional): 'INR', 'USD', etc.
- `paymentMethod` (optional): 'UPI', 'BANK', 'PAYTM', 'GOOGLEPAY'
- `minAmount` (optional): minimum order amount
- `maxAmount` (optional): maximum order amount
- `page` (optional): page number (default: 1)
- `limit` (optional): items per page (default: 20)

**Example Request:**
```
GET /ads?type=SELL&fiatCurrency=INR&paymentMethod=UPI&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "total": 150,
  "page": 1,
  "limit": 20,
  "pages": 8,
  "ads": [
    {
      "_id": "ad_id",
      "advertiser": {
        "_id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "rating": 4.8,
        "completedTrades": 45,
        "isVerified": true
      },
      "type": "SELL",
      "asset": "USDT",
      "fiatCurrency": "INR",
      "price": 91.50,
      "minOrderAmount": 500,
      "maxOrderAmount": 50000,
      "availableAmount": 25000,
      "totalAmount": 50000,
      "paymentMethods": ["UPI", "BANK"],
      "timeLimit": 15,
      "terms": "Fast payment",
      "isActive": true,
      "completedOrders": 12,
      "createdAt": "2026-02-04T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Single Ad
**GET** `/ads/:id`

**Response:**
```json
{
  "success": true,
  "ad": { ... } // Same as above
}
```

---

### 3. Create Ad (Protected)
**POST** `/ads`

**Request Body:**
```json
{
  "type": "SELL",
  "price": 91.50,
  "minOrderAmount": 500,
  "maxOrderAmount": 50000,
  "availableAmount": 50000,
  "paymentMethods": ["UPI", "BANK"],
  "timeLimit": 15,
  "terms": "Fast payment",
  "fiatCurrency": "INR"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ad created successfully",
  "ad": { ... }
}
```

---

### 4. Update Ad (Protected)
**PUT** `/ads/:id`

**Request Body:**
```json
{
  "price": 92.00,
  "availableAmount": 30000,
  "isActive": true
}
```

---

### 5. Delete Ad (Protected)
**DELETE** `/ads/:id`

---

### 6. Get My Ads (Protected)
**GET** `/ads/user/my-ads`

**Response:**
```json
{
  "success": true,
  "count": 5,
  "ads": [...]
}
```

---

## Trades Endpoints

### 1. Create Trade (Protected)
**POST** `/trades`

**Request Body:**
```json
{
  "adId": "ad_id",
  "amount": 5000,
  "paymentMethod": "UPI"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Trade initiated successfully",
  "trade": {
    "_id": "trade_id",
    "ad": "ad_id",
    "buyer": {
      "_id": "buyer_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "seller": {
      "_id": "seller_id",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com"
    },
    "amount": 5000,
    "price": 91.50,
    "totalPrice": 457500,
    "paymentMethod": "UPI",
    "status": "PENDING",
    "chatHistory": [],
    "expiresAt": "2026-02-04T10:15:00Z",
    "createdAt": "2026-02-04T10:00:00Z"
  }
}
```

---

### 2. Get My Trades (Protected)
**GET** `/trades/my-trades`

**Query Parameters:**
- `status` (optional): 'PENDING', 'PAYMENT_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'DISPUTED'
- `page` (optional): page number (default: 1)
- `limit` (optional): items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "total": 50,
  "page": 1,
  "limit": 20,
  "pages": 3,
  "trades": [...]
}
```

---

### 3. Get Trade by ID (Protected)
**GET** `/trades/:id`

**Response:**
```json
{
  "success": true,
  "trade": { ... }
}
```

---

### 4. Update Trade Status (Protected)
**PUT** `/trades/:id/status`

**Request Body:**
```json
{
  "status": "PAYMENT_SENT"
}
```

**Possible Statuses:**
- PENDING
- PAYMENT_SENT
- CONFIRMED
- COMPLETED
- CANCELLED
- DISPUTED

---

### 5. Add Message to Trade (Protected)
**POST** `/trades/:id/message`

**Request Body:**
```json
{
  "message": "I have sent the payment"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message added successfully",
  "trade": {
    "chatHistory": [
      {
        "sender": "user_id",
        "message": "I have sent the payment",
        "timestamp": "2026-02-04T10:05:00Z"
      }
    ]
  }
}
```

---

### 6. Rate User (Protected)
**POST** `/trades/:id/rate`

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great seller, fast payment",
  "isForBuyer": false
}
```

**Parameters:**
- `rating`: 1-5
- `review`: user review text
- `isForBuyer`: true if rating the buyer, false if rating the seller

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "error message"
}
```

---

## Setup Instructions

1. **Install Dependencies**
```bash
cd binance-backend
npm install
```

2. **Configure MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env` file

3. **Update JWT Secret**
- Change `JWT_SECRET` in `.env` to a secure random string

4. **Start Backend**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

## Frontend Integration

Update your frontend API calls to use:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: userEmail,
    password: userPassword
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```
