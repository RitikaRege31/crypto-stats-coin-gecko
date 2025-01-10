const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

// API /stats
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) return res.status(404).json({ error: 'Coin data not found' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API /deviation
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  try {
    const prices = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price -_id');

    if (prices.length === 0) return res.status(404).json({ error: 'No data found for this coin' });

    const priceValues = prices.map(p => p.price);

    const mean =
      priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length;

    const variance =
      priceValues.reduce((sum, price) => sum + (price - mean) ** 2, 0) / priceValues.length;

    const deviation = Math.sqrt(variance);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
