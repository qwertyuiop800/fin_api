const axios = require('axios');
const Acao = require('../models/Acao');
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'GMD766SP9414SMBX';

async function atualizarPrecosAcoes() {
  const acoes = await Acao.find();
  for (const acao of acoes) {
    try {
      const symbol = `${acao.codigo}.SAO`;
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await axios.get(url);
      const globalQuote = response.data["Global Quote"];
      if (globalQuote && globalQuote["05. price"]) {
        const price = globalQuote["05. price"];
        acao.preco = parseFloat(price);
        await acao.save();
        console.log(`Preço atualizado: ${acao.codigo} = R$ ${price}`);
      } else {
        console.error(`Resposta inesperada da API para ${acao.codigo}:`, response.data);
      }
    } catch (err) {
      console.error(`Erro ao atualizar ${acao.codigo}:`, err.message);
    }
  }
}

module.exports = atualizarPrecosAcoes;
