const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const TestDriveRoutes = require('./routes/testDriveRoutes.js');

const app = express();

// Connect to the database
connectDB().catch(err => console.error('Database connection error:', err));

// Enable CORS
app.use(cors({
  origin: 'https://cars-front-six.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/testDrive', TestDriveRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cars API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// For local development

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


module.exports = app;
