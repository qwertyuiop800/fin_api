const axios = require('axios');
const Cripto = require('../models/Cripto');

const lista = require('./listaAcoesPrincipais');

// Usar os IDs da CoinGecko presentes na lista principal
const cryptos = lista.map(c => ({ ...c, id: c.codigo }));

async function atualizarPrecosCriptos() {
  try {
    const ids = cryptos.map(c => c.id).join(',');
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    for (const crypto of cryptos) {
      const preco = response.data[crypto.id]?.usd;
      if (!preco) continue;
      await Cripto.findOneAndUpdate(
        { codigo: crypto.id },
        { nome: crypto.nome, preco: preco },
        { upsert: true, new: true }
      );
      console.log(`Preço de ${crypto.nome} atualizado: $${preco}`);
    }
  } catch (err) {
    console.error('Erro ao atualizar preços de criptos:', err.message);
  }
}

module.exports = atualizarPrecosCriptos;
