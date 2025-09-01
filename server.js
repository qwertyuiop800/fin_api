const express = require('express');
const mongoose = require('mongoose');
const stocksRouter = require('./routes/stocks');
const acoesRouter = require('./routes/acoes');
const atualizarPrecosAcoes = require('./utils/atualizarPrecosAcoes');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')();

// Routes
app.use('/api/stocks', stocksRouter);
app.use('/api/acoes', acoesRouter);
// Atualiza preços de 1 em 1 minuto
global.precosInterval = setInterval(atualizarPrecosAcoes, 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
