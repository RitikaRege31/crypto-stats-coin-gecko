require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchCryptoData } = require('./services/jobService');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Run initial data fetch
fetchCryptoData();
