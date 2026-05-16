const ErrorResponse = require('../utils/ErrorResponse');
const ItemEmprestimo = require('./ItemEmprestimo');

class Emprestimo {
  constructor({
    id_emprestimo,
    id_usuario,
    nome_leitor,
    data_emprestimo,
    data_devolucao,
    status = 'aberto',
    itens = []
  }) {
    this.id_emprestimo = id_emprestimo;
    this.id_usuario = id_usuario;
    this.nome_leitor = nome_leitor;
    this.data_emprestimo = data_emprestimo;
    this.data_devolucao = data_devolucao;
    this.status = status;
    this.itens = itens;
  }

  static validar(dados) {
    const erros = [];

    if (!Number.isInteger(Number(dados.id_usuario))) {
      erros.push('Usuario do emprestimo e obrigatorio');
    }

    if (!dados.nome_leitor || String(dados.nome_leitor).trim().length < 3) {
      erros.push('Nome do leitor deve ter pelo menos 3 caracteres');
    }

    if (!Array.isArray(dados.itens) || dados.itens.length === 0) {
      erros.push('Emprestimo deve possuir pelo menos um item');
    }

    if (erros.length) {
      throw new ErrorResponse('Dados de emprestimo invalidos', 400, erros);
    }

    dados.itens.forEach((item) => ItemEmprestimo.validar(item));
  }
}

module.exports = Emprestimo;
