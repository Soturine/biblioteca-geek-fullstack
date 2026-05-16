const IService = require('../interfaces/IService');
const Autor = require('../model/Autor');
const AutorDAO = require('../dao/AutorDAO');
const ErrorResponse = require('../utils/ErrorResponse');

class AutorService extends IService {
  constructor() {
    super();
    this.autorDAO = new AutorDAO();
  }

  async create(dados) {
    Autor.validar(dados);
    return this.autorDAO.create({
      nome: dados.nome.trim(),
      nacionalidade: dados.nacionalidade ? dados.nacionalidade.trim() : null
    });
  }

  async findAll() {
    return this.autorDAO.findAll();
  }

  async findById(id) {
    const autor = await this.autorDAO.findById(id);
    if (!autor) {
      throw new ErrorResponse('Autor nao encontrado', 404);
    }
    return autor;
  }

  async update(id, dados) {
    await this.findById(id);
    Autor.validar(dados);
    return this.autorDAO.update(id, {
      nome: dados.nome.trim(),
      nacionalidade: dados.nacionalidade ? dados.nacionalidade.trim() : null
    });
  }

  async delete(id) {
    await this.findById(id);
    return this.autorDAO.delete(id);
  }
}

module.exports = AutorService;
