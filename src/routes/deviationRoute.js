const express = require('express');
const Crypto = require('../models/cryptoModel');
const router = express.Router();

router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length === 0) return res.status(404).json({ error: 'No records found' });

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
