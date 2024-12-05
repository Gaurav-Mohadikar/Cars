const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const TestDriveRoutes = require('./routes/testDriveRoutes.js');

const app = express();

// Connect to the database
connectDB();

// Enable CORS and allow requests from your React app's origin
app.use(cors({
  origin: 'https://cars-front-six.vercel.app', // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // If you are sending cookies with requests
}));

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/testDrive', TestDriveRoutes);

// Add a root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cars API' });
});

// For local development

  const port =  3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


// Export the Express app for serverless use
module.exports = app;
