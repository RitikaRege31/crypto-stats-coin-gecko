const axios = require('axios');
const Crypto = require('../models/cryptoModel');
const cron = require('node-cron');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
  try {
    for (const coin of COINS) {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: coin,
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_change: 'true',
        },
      });

      const details = data[coin];
      const crypto = new Crypto({
        coin,
        price: details.usd,
        marketCap: details.usd_market_cap,
        change24h: details.usd_24h_change,
      });
      await crypto.save();
    }
    console.log('Crypto data fetched and stored.');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;
