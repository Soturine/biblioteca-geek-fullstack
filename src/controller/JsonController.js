const IController = require('../interfaces/IController');
const JsonService = require('../service/JsonService');
const LogService = require('../service/LogService');
const { successResponse } = require('../utils/response_helper');
const ErrorResponse = require('../utils/ErrorResponse');

class JsonController extends IController {
  constructor() {
    super();
    this.jsonService = new JsonService();
  }

  async exportar(req, res, next) {
    try {
      const dados = await this.jsonService.exportar(req.params.entidade);
      LogService.registrarAcao(req, {
        acao: 'EXPORTACAO_JSON',
        tabela: req.params.entidade,
        detalhes: `Exportacao JSON de ${req.params.entidade}`
      }).catch(() => {});
      return successResponse(res, 200, 'JSON exportado com sucesso', dados);
    } catch (error) {
      next(error);
    }
  }

  async importar(req, res, next) {
    try {
      if (!req.file) {
        throw new ErrorResponse('Arquivo JSON nao enviado', 400);
      }

      const conteudo = req.file.buffer.toString('utf8');
      const resultado = await this.jsonService.importar(req.params.entidade, conteudo);
      LogService.registrarAcao(req, {
        acao: 'IMPORTACAO_JSON',
        tabela: req.params.entidade,
        detalhes: resultado,
        status_code: 201
      }).catch(() => {});
      return successResponse(res, 201, 'JSON importado com sucesso', resultado);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    return this.exportar(req, res, next);
  }

  async show(req, res, next) {
    return this.exportar(req, res, next);
  }

  async store(req, res, next) {
    return this.importar(req, res, next);
  }

  async update(req, res, next) {
    return this.importar(req, res, next);
  }

  async destroy(req, res) {
    return res.status(204).send();
  }
}

module.exports = JsonController;
