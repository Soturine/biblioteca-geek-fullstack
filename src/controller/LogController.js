const IController = require('../interfaces/IController');
const LogService = require('../service/LogService');
const { successResponse } = require('../utils/response_helper');

class LogController extends IController {
  async exportarXml(req, res, next) {
    try {
      const xml = await LogService.exportarXml({
        usuario: req.query.usuario,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim,
        tipo: req.query.tipo,
      });

      LogService.registrarAcao(req, {
        acao: 'EXPORTACAO_XML',
        tabela: 'logs',
        detalhes: 'Exportação XML de logs',
      }).catch(() => {});

      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="logs_biblioteca_geek.xml"');
      return res.status(200).send(xml);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const logs = await LogService.findAll(req.query);
      return successResponse(res, 200, 'Logs listados com sucesso', logs);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const log = await LogService.findById(req.params.id);
      return successResponse(res, 200, 'Log encontrado com sucesso', log);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const log = await LogService.create(req.body);
      return successResponse(res, 201, 'Log criado com sucesso', log);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const log = await LogService.update(req.params.id, req.body);
      return successResponse(res, 200, 'Log atualizado com sucesso', log);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await LogService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LogController;
