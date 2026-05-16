const IService = require('../interfaces/IService');
const Categoria = require('../model/Categoria');
const CategoriaDAO = require('../dao/CategoriaDAO');
const ErrorResponse = require('../utils/ErrorResponse');

class CategoriaService extends IService {
  constructor() {
    super();
    this.categoriaDAO = new CategoriaDAO();
  }

  async create(dados) {
    Categoria.validar(dados);

    const existente = await this.categoriaDAO.findByNome(dados.nome);
    if (existente) {
      throw new ErrorResponse('Categoria ja cadastrada', 400);
    }

    return this.categoriaDAO.create({ nome: dados.nome.trim() });
  }

  async findAll() {
    return this.categoriaDAO.findAll();
  }

  async findById(id) {
    const categoria = await this.categoriaDAO.findById(id);
    if (!categoria) {
      throw new ErrorResponse('Categoria nao encontrada', 404);
    }
    return categoria;
  }

  async update(id, dados) {
    await this.findById(id);
    Categoria.validar(dados);

    const existente = await this.categoriaDAO.findByNome(dados.nome);
    if (existente && Number(existente.id_categoria) !== Number(id)) {
      throw new ErrorResponse('Categoria ja cadastrada', 400);
    }

    return this.categoriaDAO.update(id, { nome: dados.nome.trim() });
  }

  async delete(id) {
    await this.findById(id);
    return this.categoriaDAO.delete(id);
  }
}

module.exports = CategoriaService;
