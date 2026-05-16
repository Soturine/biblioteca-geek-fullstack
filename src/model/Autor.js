const ErrorResponse = require('../utils/ErrorResponse');

class Autor {
  constructor({ id_autor, nome, nacionalidade }) {
    this.id_autor = id_autor;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
  }

  static validar(dados) {
    if (!dados.nome || String(dados.nome).trim().length < 3) {
      throw new ErrorResponse('Autor deve possuir nome com pelo menos 3 caracteres', 400);
    }
  }
}

module.exports = Autor;
