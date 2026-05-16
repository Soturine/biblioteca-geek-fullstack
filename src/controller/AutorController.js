const IController = require('../interfaces/IController');
const AutorService = require('../service/AutorService');
const LogService = require('../service/LogService');
const { successResponse, noContentResponse } = require('../utils/response_helper');

class AutorController extends IController {
  constructor() {
    super();
    this.autorService = new AutorService();
  }

  async index(req, res, next) {
    try {
      const autores = await this.autorService.findAll();
      return successResponse(res, 200, 'Autores listados com sucesso', autores);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const autor = await this.autorService.findById(req.params.id);
      return successResponse(res, 200, 'Autor encontrado com sucesso', autor);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const autor = await this.autorService.create(req.body);
      LogService.registrarAcao(req, {
        acao: 'INCLUSAO',
        tabela: 'autores',
        registro_id: autor.id_autor,
        detalhes: `Autor ${autor.nome} cadastrado`,
        status_code: 201
      }).catch(() => {});
      return successResponse(res, 201, 'Autor cadastrado com sucesso', autor);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const autor = await this.autorService.update(req.params.id, req.body);
      LogService.registrarAcao(req, {
        acao: 'ALTERACAO',
        tabela: 'autores',
        registro_id: autor.id_autor,
        detalhes: `Autor ${autor.nome} atualizado`
      }).catch(() => {});
      return successResponse(res, 200, 'Autor atualizado com sucesso', autor);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await this.autorService.delete(req.params.id);
      LogService.registrarAcao(req, {
        acao: 'EXCLUSAO',
        tabela: 'autores',
        registro_id: req.params.id,
        detalhes: 'Autor excluido',
        status_code: 204
      }).catch(() => {});
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AutorController;
