require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Basic logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connection state
let isConnected = false;

// MongoDB connection function with retry
const connectDB = async (retryCount = 0) => {
  if (isConnected) return;

  const maxRetries = 3;
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    if (retryCount < maxRetries) {
      console.log(`Retrying connection... Attempt ${retryCount + 1} of ${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
      return connectDB(retryCount + 1);
    }
    
    throw error;
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test route with DB connection check
app.get('/test', async (req, res) => {
  try {
    await connectDB();
    res.json({ 
      message: 'Test endpoint working',
      dbStatus: 'Connected',
      dbHost: mongoose.connection.host,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      message: error.message,
      details: error.toString(),
      timestamp: new Date().toISOString()
    });
  }
});

// API routes
const router = express.Router();

// Test API route
router.get('/test', async (req, res) => {
  try {
    await connectDB();
    res.json({ 
      message: 'API route working',
      dbStatus: 'Connected',
      dbHost: mongoose.connection.host,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API test endpoint error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      message: error.message,
      details: error.toString(),
      timestamp: new Date().toISOString()
    });
  }
});

app.use('/api', router);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    details: err.toString(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.url,
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
