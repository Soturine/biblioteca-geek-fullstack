const IService = require('../interfaces/IService');
const LivroDAO = require('../dao/LivroDAO');

class RelatorioService extends IService {
  constructor() {
    super();
    this.livroDAO = new LivroDAO();
  }

  async livros(filtros = {}) {
    const livros = await this.livroDAO.relatorio(filtros);
    return {
      total: livros.length,
      livros,
    };
  }

  async livrosPorCategoria() {
    return this.livroDAO.livrosPorCategoria();
  }

  async create(dados) {
    return dados;
  }

  async findAll() {
    return this.livros();
  }

  async findById() {
    return null;
  }

  async update(id, dados) {
    return dados;
  }

  async delete() {
    return false;
  }
}

module.exports = RelatorioService;
