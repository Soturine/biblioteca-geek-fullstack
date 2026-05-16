const IController = require('../interfaces/IController');
const RelatorioService = require('../service/RelatorioService');
const { successResponse } = require('../utils/response_helper');

class RelatorioController extends IController {
  constructor() {
    super();
    this.relatorioService = new RelatorioService();
  }

  async livros(req, res, next) {
    try {
      const relatorio = await this.relatorioService.livros({ categoria: req.query.categoria });
      return successResponse(res, 200, 'Relatorio de livros gerado com sucesso', relatorio);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    return this.livros(req, res, next);
  }

  async show(req, res, next) {
    return this.livros(req, res, next);
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

module.exports = RelatorioController;
