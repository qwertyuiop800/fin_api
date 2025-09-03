const express = require('express');
const mongoose = require('mongoose');
const atualizarPrecosCriptos = require('./utils/atualizarPrecoBitcoin');
const inicializarAcoesPrincipais = require('./utils/inicializarAcoesPrincipais');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')();


// Atualiza preços das 50 maiores criptos de 30 em 30 segundos
global.precosInterval = setInterval(() => {
  atualizarPrecosCriptos();
}, 30 * 1000);

// Inicializa a lista principal de 50 criptos ao iniciar o servidor
inicializarAcoesPrincipais();

// Rota para retornar todas as criptos
const Cripto = require('./models/Cripto');
app.get('/api/criptos', async (req, res) => {
  try {
    const criptos = await Cripto.find();
    res.json(criptos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar criptos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
