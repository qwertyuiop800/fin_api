const express = require('express');
const mongoose = require('mongoose');
const atualizarPrecosCriptos = require('./utils/atualizarPrecoBitcoin');
const inicializarAcoesPrincipais = require('./utils/inicializarAcoesPrincipais');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')();

// Routes
// Apenas rota de criptos será usada
// Atualiza preços das 50 maiores criptos de 30 em 30 segundos
global.precosInterval = setInterval(() => {
  atualizarPrecosCriptos();
}, 30 * 1000);

// Inicializa a lista principal de 50 criptos ao iniciar o servidor
inicializarAcoesPrincipais();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
