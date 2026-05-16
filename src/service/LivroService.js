const IService = require('../interfaces/IService');
const Livro = require('../model/Livro');
const LivroDAO = require('../dao/LivroDAO');
const AutorDAO = require('../dao/AutorDAO');
const CategoriaDAO = require('../dao/CategoriaDAO');
const ErrorResponse = require('../utils/ErrorResponse');

class LivroService extends IService {
  constructor() {
    super();
    this.livroDAO = new LivroDAO();
    this.autorDAO = new AutorDAO();
    this.categoriaDAO = new CategoriaDAO();
  }

  async validarRelacionamentos(dados) {
    const autor = await this.autorDAO.findById(dados.id_autor);
    if (!autor) {
      throw new ErrorResponse('Autor informado nao existe', 404);
    }

    const categoria = await this.categoriaDAO.findById(dados.id_categoria);
    if (!categoria) {
      throw new ErrorResponse('Categoria informada nao existe', 404);
    }
  }

  normalizar(dados) {
    return {
      titulo: dados.titulo.trim(),
      ano: Number(dados.ano),
      quantidade: Number(dados.quantidade),
      imagem: dados.imagem || null,
      id_autor: Number(dados.id_autor),
      id_categoria: Number(dados.id_categoria)
    };
  }

  async create(dados) {
    Livro.validar(dados);
    await this.validarRelacionamentos(dados);
    return this.livroDAO.create(this.normalizar(dados));
  }

  async findAll(filtros = {}) {
    return this.livroDAO.findAll(filtros);
  }

  async findById(id) {
    const livro = await this.livroDAO.findById(id);
    if (!livro) {
      throw new ErrorResponse('Livro nao encontrado', 404);
    }
    return livro;
  }

  async update(id, dados) {
    await this.findById(id);
    Livro.validar(dados);
    await this.validarRelacionamentos(dados);
    return this.livroDAO.update(id, this.normalizar(dados));
  }

  async updateImagem(id, imagem) {
    await this.findById(id);
    return this.livroDAO.updateImagem(id, imagem);
  }

  async delete(id) {
    await this.findById(id);
    return this.livroDAO.delete(id);
  }
}

module.exports = LivroService;
