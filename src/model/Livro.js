const ErrorResponse = require('../utils/ErrorResponse');

class Livro {
  constructor({
    id_livro,
    titulo,
    ano,
    quantidade,
    imagem,
    paginas,
    sinopse,
    editora,
    isbn,
    id_autor,
    id_categoria,
  }) {
    this.id_livro = id_livro;
    this.titulo = titulo;
    this.ano = ano;
    this.quantidade = quantidade;
    this.imagem = imagem;
    this.paginas = paginas;
    this.sinopse = sinopse;
    this.editora = editora;
    this.isbn = isbn;
    this.id_autor = id_autor;
    this.id_categoria = id_categoria;
  }

  static validar(dados) {
    const erros = [];

    if (!dados.titulo || String(dados.titulo).trim().length === 0) {
      erros.push('Título do livro é obrigatório');
    }

    if (!Number.isInteger(Number(dados.ano)) || Number(dados.ano) < 1900) {
      erros.push('Ano deve ser numérico e maior ou igual a 1900');
    }

    if (!Number.isInteger(Number(dados.quantidade)) || Number(dados.quantidade) < 0) {
      erros.push('Quantidade deve ser um número inteiro maior ou igual a zero');
    }

    if (!Number.isInteger(Number(dados.paginas || 0)) || Number(dados.paginas || 0) < 0) {
      erros.push('Páginas deve ser um número inteiro maior ou igual a zero');
    }

    if (dados.sinopse && String(dados.sinopse).trim().length < 10) {
      erros.push('Sinopse deve possuir pelo menos 10 caracteres quando preenchida');
    }

    if (!Number.isInteger(Number(dados.id_autor))) {
      erros.push('Autor obrigatório');
    }

    if (!Number.isInteger(Number(dados.id_categoria))) {
      erros.push('Categoria obrigatória');
    }

    if (erros.length) {
      throw new ErrorResponse('Dados de livro inválidos', 400, erros);
    }
  }
}

module.exports = Livro;
