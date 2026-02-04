# Quick Start Commands

## One-Time Setup

### 1. Install All Dependencies
```bash
# Backend
cd binance-backend
npm install

# Frontend
cd binance-ui
npm install
```

### 2. Ensure MongoDB is Running
```bash
# Windows: Install MongoDB Community Edition from:
# https://www.mongodb.com/try/download/community

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

---

## Daily Development Startup

### Terminal 1: Start Backend
```bash
cd binance-backend
npm run dev
# Expected: Server running on port 5000
```

### Terminal 2: Start Frontend
```bash
cd binance-ui
npm run dev
# Expected: ➜ Local: http://localhost:5175/
```

### Terminal 3: MongoDB (if using local instance)
```bash
mongod
# Expected: "Listening on 27017"
```

---

## Quick Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5175 | Main application |
| Backend | http://localhost:5000 | API server |
| Backend Health | http://localhost:5000/api/health | API status |
| MongoDB | mongodb://localhost:27017 | Database |

---

## API Quick Reference

### Signup
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

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test@1234"
  }'
```

### Get Ads
```bash
curl http://localhost:5000/api/ads?type=BUY&limit=10
```

---

## Common Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or change PORT in .env
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# If not running, start it
mongod
```

### Clear Frontend Cache
```bash
# In browser DevTools:
# Storage → Clear Site Data
# Or Ctrl+Shift+Delete → Clear browsing data
```

### Force Restart Dev Servers
```bash
# Kill all Node processes
pkill -f node

# Or restart terminals
```

---

## Development Tips

### Backend Hot Reload
- Changes to `.js` files auto-reload (nodemon enabled)
- Frontend changes auto-refresh (Vite HMR)

### Network Inspection
- Open DevTools (F12)
- Go to Network tab
- Try login/signup to see API calls
- Check request/response headers

### Debug Mode
```bash
# Backend debug logging
NODE_DEBUG=* npm run dev

# Frontend debug
# DevTools → Console for logs
```

---

## Build for Production

### Backend (no build needed)
```bash
NODE_ENV=production PORT=5000 npm start
```

### Frontend Build
```bash
cd binance-ui
npm run build
# Creates dist/ folder with optimized build
```

---

**Last Updated: February 4, 2026**
