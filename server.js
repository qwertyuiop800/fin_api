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

// Atualizar quantidade de uma cripto
app.put('/api/criptos/:id/quantidade', async (req, res) => {
  try {
    const { quantidade } = req.body;
    if (typeof quantidade !== 'number') {
      return res.status(400).json({ error: 'Quantidade inválida' });
    }
    const cripto = await Cripto.findByIdAndUpdate(
      req.params.id,
      { quantidade },
      { new: true }
    );
    if (!cripto) return res.status(404).json({ error: 'Cripto não encontrada' });
    res.json(cripto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar quantidade' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
