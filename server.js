const express = require('express');
const mongoose = require('mongoose');
const stocksRouter = require('./routes/stocks');
const acoesRouter = require('./routes/acoes');
const atualizarPrecosAcoes = require('./utils/atualizarPrecosAcoes');
const atualizarPrecoBitcoin = require('./utils/atualizarPrecoBitcoin');
const atualizarPrecosCriptos = require('./utils/atualizarPrecoBitcoin');
const inicializarAcoesPrincipais = require('./utils/inicializarAcoesPrincipais');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')();

// Routes
app.use('/api/stocks', stocksRouter);
app.use('/api/acoes', acoesRouter);
// Atualiza preços de ações e Bitcoin de 1 em 1 minuto
global.precosInterval = setInterval(() => {
  atualizarPrecosAcoes();
  atualizarPrecosCriptos();
}, 60 * 1000);

// Inicializa a lista principal de 50 ações e criptos ao iniciar o servidor
inicializarAcoesPrincipais();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
