const express = require('express');
const cors = require('cors');
const http = require('http'); // Required for Socket.io
const { Server } = require('socket.io'); // Socket.io server class
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app); // Wrap express with HTTP server

// Socket.io initialization with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://binanceclonesite.netlify.app"],
    methods: ["GET", "POST"]
  }
});

// Connect to database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', "https://binanceclonesite.netlify.app"];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins a private room for a specific trade
  socket.on('join_trade', (tradeId) => {
    socket.join(tradeId);
    console.log(`User joined trade room: ${tradeId}`);
  });

  // Listen for incoming messages and broadcast to the room
  socket.on('send_message', (data) => {
    // Broadcast to everyone in the trade room
    io.to(data.tradeId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/trades', require('./routes/trades'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running with Real-time Chat' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

// Start the HTTP server instead of express app
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});