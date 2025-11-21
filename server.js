require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://bhavikaahuja495_db_user:%2E%23bnwhtZLkhYw6T@cluster0.mwpxdxh.mongodb.net/greencart?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Tip: Make sure MongoDB is running or check your connection string');
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET || 'greencart-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Make session available in all views
app.use((req, res, next) => {
  res.locals.user = req.session;
  res.locals.cart = req.session.cart || [];
  next();
});

// Enable CORS for React frontend
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// API Routes
const apiAuthRoutes = require('./routes/api/auth');
const apiProductRoutes = require('./routes/api/products');
const apiCartRoutes = require('./routes/api/cart');
const apiSellerRoutes = require('./routes/api/sellers');

app.use('/api/auth', apiAuthRoutes);
app.use('/api/products', apiProductRoutes);
app.use('/api/cart', apiCartRoutes);
app.use('/api/sellers', apiSellerRoutes);

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({
    message: 'GreenCart API Server',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      sellers: '/api/sellers',
      cart: '/api/cart',
      auth: '/api/auth'
    },
    frontend: 'http://localhost:5174',
    status: 'running'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🌱 Green Cart Marketplace running on http://localhost:${PORT}`);
});
