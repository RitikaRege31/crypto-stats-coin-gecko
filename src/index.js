const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const statsRoute = require('./routes/statsRoute');
const deviationRoute = require('./routes/deviationRoute');
const fetchCryptoData = require('./services/jobService');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use(statsRoute);
app.use(deviationRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Run the job once on server start
fetchCryptoData();
