// Import required modules
const express = require('express');
const cors = require('cors');

require('dotenv').config(); // Load environment variables from .env file

// Import database connection and routes
const { connectDB } = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const testDriveRoutes = require('./routes/testDriveRoutes.js');

// Initialize Express app
const app = express();

// Get the port from environment variables or use 3000 as default
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Enable CORS and allow requests from the React frontend
app.use(cors({
  origin: [
    'https://cars-front-six.vercel.app', // Production frontend
    'http://localhost:3000' // Development frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies or authorization headers
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log HTTP requests

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/testDrive', testDriveRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
