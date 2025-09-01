const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const axios = require('axios');

// Get all stocks in portfolio
router.get('/', async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
});

// Add a stock to portfolio
router.post('/', async (req, res) => {
  const { symbol, name } = req.body;
  // Fetch price from external API (placeholder)
  const price = await fetchStockPrice(symbol);
  const stock = new Stock({ symbol, name, price });
  await stock.save();
  res.status(201).json(stock);
});

// Get real-time price for a stock
router.get('/:symbol/price', async (req, res) => {
  const { symbol } = req.params;
  const price = await fetchStockPrice(symbol);
  res.json({ symbol, price });
});

// Helper: fetch price from external API (replace with real API)
async function fetchStockPrice(symbol) {
  // Example using Yahoo Finance API (replace with your API key and endpoint)
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const price = response.data.quoteResponse.result[0]?.regularMarketPrice || 0;
    return price;
  } catch (err) {
    return 0;
  }
}

module.exports = router;
