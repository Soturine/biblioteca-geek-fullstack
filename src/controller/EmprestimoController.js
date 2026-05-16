const IController = require('../interfaces/IController');
const EmprestimoService = require('../service/EmprestimoService');
const LogService = require('../service/LogService');
const { successResponse, noContentResponse } = require('../utils/response_helper');

class EmprestimoController extends IController {
  constructor() {
    super();
    this.emprestimoService = new EmprestimoService();
  }

  prepararBody(req) {
    return {
      ...req.body,
      id_usuario: req.body.id_usuario || req.usuario.id_usuario
    };
  }

  async index(req, res, next) {
    try {
      const emprestimos = await this.emprestimoService.findAll();
      return successResponse(res, 200, 'Emprestimos listados com sucesso', emprestimos);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const emprestimo = await this.emprestimoService.findById(req.params.id);
      return successResponse(res, 200, 'Emprestimo encontrado com sucesso', emprestimo);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const emprestimo = await this.emprestimoService.create(this.prepararBody(req));
      LogService.registrarAcao(req, {
        acao: 'INCLUSAO',
        tabela: 'emprestimos',
        registro_id: emprestimo.id_emprestimo,
        detalhes: `Emprestimo criado para ${emprestimo.nome_leitor}`,
        status_code: 201
      }).catch(() => {});
      return successResponse(res, 201, 'Emprestimo cadastrado com sucesso', emprestimo);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const emprestimo = await this.emprestimoService.update(req.params.id, this.prepararBody(req));
      LogService.registrarAcao(req, {
        acao: 'ALTERACAO',
        tabela: 'emprestimos',
        registro_id: emprestimo.id_emprestimo,
        detalhes: `Emprestimo ${emprestimo.id_emprestimo} atualizado`
      }).catch(() => {});
      return successResponse(res, 200, 'Emprestimo atualizado com sucesso', emprestimo);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await this.emprestimoService.delete(req.params.id);
      LogService.registrarAcao(req, {
        acao: 'EXCLUSAO',
        tabela: 'emprestimos',
        registro_id: req.params.id,
        detalhes: 'Emprestimo excluido e livros devolvidos ao estoque',
        status_code: 204
      }).catch(() => {});
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EmprestimoController;
