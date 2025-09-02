const Acao = require('../models/Acao');
const lista = require('./listaAcoesPrincipais');

async function inicializarAcoesPrincipais() {
  for (const acao of lista) {
    await Acao.findOneAndUpdate(
      { codigo: acao.codigo },
      {
        nome: acao.nome,
        codigo: acao.codigo,
        preco: acao.preco || 0,
        quantidade: acao.quantidade || 0
      },
      { upsert: true }
    );
  }
  console.log('Lista principal de ações e criptos inicializada!');
}

module.exports = inicializarAcoesPrincipais;
