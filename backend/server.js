// Author: Giorgio Antonacci

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import route files
const sportsRoutes = require('./routes/sports');
const contactRoutes = require('./routes/contact');
const statsRoutes = require('./routes/stats');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/sports', sportsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('VSA Backend Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`[✓] Backend server running on port ${PORT}`);
});
