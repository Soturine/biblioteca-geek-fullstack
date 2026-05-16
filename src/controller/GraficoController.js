const IController = require('../interfaces/IController');
const RelatorioService = require('../service/RelatorioService');
const { successResponse } = require('../utils/response_helper');

class GraficoController extends IController {
  constructor() {
    super();
    this.relatorioService = new RelatorioService();
  }

  async livrosPorCategoria(req, res, next) {
    try {
      const dados = await this.relatorioService.livrosPorCategoria();
      return successResponse(res, 200, 'Dados do grafico gerados com sucesso', dados);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    return this.livrosPorCategoria(req, res, next);
  }

  async show(req, res, next) {
    return this.livrosPorCategoria(req, res, next);
  }

  async store(req, res) {
    return res.status(204).send();
  }

  async update(req, res) {
    return res.status(204).send();
  }

  async destroy(req, res) {
    return res.status(204).send();
  }
}

module.exports = GraficoController;
