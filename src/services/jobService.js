const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../models/Crypto');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
  try {
    const responses = await Promise.all(
      coins.map(coin => 
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      )
    );

    const cryptoData = responses.map(res => ({
      coin: res.data.id,
      price: res.data.market_data.current_price.usd,
      marketCap: res.data.market_data.market_cap.usd,
      change24h: res.data.market_data.price_change_percentage_24h,
    }));

    // Store data in the database
    await Crypto.insertMany(cryptoData);

    console.log('Crypto data fetched and saved:', cryptoData);
  } catch (err) {
    console.error('Error fetching crypto data:', err.message);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);
// cron.schedule('*/2 * * * *', fetchCryptoData);

module.exports = { fetchCryptoData };
