const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String },
  price: { type: Number },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stock', StockSchema);
