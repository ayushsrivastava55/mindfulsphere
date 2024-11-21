require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const OpenAI = require('openai');
const path = require('path');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://frontend-63tcztaw5-ayushsrivastava55s-projects.vercel.app',
    'https://frontend-e4lvbnifb-ayushsrivastava55s-projects.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mindfulsphere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const resourcesRoutes = require('./routes/resources');

// Health check endpoint (before API routes)
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MindfulSphere API' });
});

// API routes
const router = express.Router();

// Test route for API
router.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/resources', resourcesRoutes);

app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 errors
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    path: req.url,
    timestamp: new Date().toISOString()
  });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

module.exports = app;
