const ErrorResponse = require('../utils/ErrorResponse');

class Livro {
  constructor({ id_livro, titulo, ano, quantidade, imagem, id_autor, id_categoria }) {
    this.id_livro = id_livro;
    this.titulo = titulo;
    this.ano = ano;
    this.quantidade = quantidade;
    this.imagem = imagem;
    this.id_autor = id_autor;
    this.id_categoria = id_categoria;
  }

  static validar(dados) {
    const erros = [];

    if (!dados.titulo || String(dados.titulo).trim().length === 0) {
      erros.push('Titulo do livro e obrigatorio');
    }

    if (!Number.isInteger(Number(dados.ano)) || Number(dados.ano) < 1900) {
      erros.push('Ano deve ser numerico e maior ou igual a 1900');
    }

    if (!Number.isInteger(Number(dados.quantidade)) || Number(dados.quantidade) < 0) {
      erros.push('Quantidade deve ser um numero inteiro maior ou igual a zero');
    }

    if (!Number.isInteger(Number(dados.id_autor))) {
      erros.push('Autor obrigatorio');
    }

    if (!Number.isInteger(Number(dados.id_categoria))) {
      erros.push('Categoria obrigatoria');
    }

    if (erros.length) {
      throw new ErrorResponse('Dados de livro invalidos', 400, erros);
    }
  }
}

module.exports = Livro;
