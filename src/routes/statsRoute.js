const express = require('express');
const Crypto = require('../models/cryptoModel');
const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;
    const data = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!data) return res.status(404).json({ error: 'Coin data not found' });

    res.json({
      price: data.price,
      marketCap: data.marketCap,
      '24hChange': data.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
