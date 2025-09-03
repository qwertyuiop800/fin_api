const mongoose = require('mongoose');

const CriptoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  preco: { type: Number, required: true },
  quantidade: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cripto', CriptoSchema);
