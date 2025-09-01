const express = require('express');
const router = express.Router();
const Acao = require('../models/Acao');

const axios = require('axios');
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'GMD766SP9414SMBX';
// Atualizar preço de uma ação usando Alpha Vantage
router.put('/atualizar-preco/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    // Exemplo para ações brasileiras: PETR4.SAO
    const symbol = `${codigo}.SAO`;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await axios.get(url);
    const price = response.data["Global Quote"]["05. price"];
    if (!price) return res.status(404).json({ error: 'Preço não encontrado na Alpha Vantage' });
    const acao = await Acao.findOneAndUpdate(
      { codigo },
      { preco: parseFloat(price) },
      { new: true }
    );
    if (!acao) return res.status(404).json({ error: 'Ação não encontrada' });
    res.json(acao);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar preço', details: err.message });
  }
});

// Listar todas as ações
router.get('/', async (req, res) => {
  try {
    const acoes = await Acao.find();
    res.json(acoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ações' });
  }
});

// Adicionar nova ação
router.post('/', async (req, res) => {
  try {
    const { nome, codigo, preco, quantidade } = req.body;
    const novaAcao = new Acao({ nome, codigo, preco, quantidade });
    await novaAcao.save();
    res.status(201).json(novaAcao);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar ação' });
  }
});

// Atualizar preço e quantidade de uma ação
router.put('/:codigo', async (req, res) => {
  try {
    const { preco, quantidade } = req.body;
    const acao = await Acao.findOneAndUpdate(
      { codigo: req.params.codigo },
      { preco, quantidade },
      { new: true }
    );
    if (!acao) return res.status(404).json({ error: 'Ação não encontrada' });
    res.json(acao);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar ação' });
  }
});

module.exports = router;
