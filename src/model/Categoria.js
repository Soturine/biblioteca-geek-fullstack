const ErrorResponse = require('../utils/ErrorResponse');

class Categoria {
  constructor({ id_categoria, nome }) {
    this.id_categoria = id_categoria;
    this.nome = nome;
  }

  static validar(dados) {
    if (!dados.nome || String(dados.nome).trim().length < 2) {
      throw new ErrorResponse('Categoria deve possuir nome', 400);
    }
  }
}

module.exports = Categoria;
