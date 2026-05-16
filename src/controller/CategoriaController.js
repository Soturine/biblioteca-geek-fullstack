const IController = require('../interfaces/IController');
const CategoriaService = require('../service/CategoriaService');
const LogService = require('../service/LogService');
const { successResponse, noContentResponse } = require('../utils/response_helper');

class CategoriaController extends IController {
  constructor() {
    super();
    this.categoriaService = new CategoriaService();
  }

  async index(req, res, next) {
    try {
      const categorias = await this.categoriaService.findAll();
      return successResponse(res, 200, 'Categorias listadas com sucesso', categorias);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const categoria = await this.categoriaService.findById(req.params.id);
      return successResponse(res, 200, 'Categoria encontrada com sucesso', categoria);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const categoria = await this.categoriaService.create(req.body);
      LogService.registrarAcao(req, {
        acao: 'INCLUSAO',
        tabela: 'categorias',
        registro_id: categoria.id_categoria,
        detalhes: `Categoria ${categoria.nome} cadastrada`,
        status_code: 201,
      }).catch(() => {});
      return successResponse(res, 201, 'Categoria cadastrada com sucesso', categoria);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const categoria = await this.categoriaService.update(req.params.id, req.body);
      LogService.registrarAcao(req, {
        acao: 'ALTERACAO',
        tabela: 'categorias',
        registro_id: categoria.id_categoria,
        detalhes: `Categoria ${categoria.nome} atualizada`,
      }).catch(() => {});
      return successResponse(res, 200, 'Categoria atualizada com sucesso', categoria);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await this.categoriaService.delete(req.params.id);
      LogService.registrarAcao(req, {
        acao: 'EXCLUSAO',
        tabela: 'categorias',
        registro_id: req.params.id,
        detalhes: 'Categoria excluida',
        status_code: 204,
      }).catch(() => {});
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriaController;
