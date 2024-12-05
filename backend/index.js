const express = require('express');
const cors = require('cors');


const app = express();









// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cars API' });
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
