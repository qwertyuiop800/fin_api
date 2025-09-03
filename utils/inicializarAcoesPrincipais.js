const Cripto = require('../models/Cripto');
const lista = require('./listaAcoesPrincipais');

async function inicializarCriptosPrincipais() {
  for (const cripto of lista) {
    await Cripto.findOneAndUpdate(
      { codigo: cripto.codigo },
      {
        nome: cripto.nome,
        codigo: cripto.codigo,
        preco: cripto.preco || 0,
        quantidade: cripto.quantidade || 0
      },
      { upsert: true, new: true }
    );
  }
  console.log('Lista principal de criptos inicializada!');
}

module.exports = inicializarCriptosPrincipais;
