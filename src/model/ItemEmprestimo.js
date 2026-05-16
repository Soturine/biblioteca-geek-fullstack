const ErrorResponse = require('../utils/ErrorResponse');

class ItemEmprestimo {
  constructor({ id_item, id_emprestimo, id_livro, quantidade }) {
    this.id_item = id_item;
    this.id_emprestimo = id_emprestimo;
    this.id_livro = id_livro;
    this.quantidade = quantidade;
  }

  static validar(dados) {
    if (!Number.isInteger(Number(dados.id_livro))) {
      throw new ErrorResponse('Livro do item e obrigatorio', 400);
    }

    if (!Number.isInteger(Number(dados.quantidade)) || Number(dados.quantidade) <= 0) {
      throw new ErrorResponse('Quantidade do item deve ser maior que zero', 400);
    }
  }
}

module.exports = ItemEmprestimo;
