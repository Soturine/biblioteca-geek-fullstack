const IController = require('../interfaces/IController');
const LivroService = require('../service/LivroService');
const LogService = require('../service/LogService');
const { successResponse, noContentResponse } = require('../utils/response_helper');
const ErrorResponse = require('../utils/ErrorResponse');

class LivroController extends IController {
  constructor() {
    super();
    this.livroService = new LivroService();
  }

  async index(req, res, next) {
    try {
      const livros = await this.livroService.findAll({
        busca: req.query.busca,
        categoria: req.query.categoria,
      });
      return successResponse(res, 200, 'Livros listados com sucesso', livros);
    } catch (error) {
      next(error);
    }
  }

  async topEmprestados(req, res, next) {
    try {
      const livros = await this.livroService.topEmprestados();
      return successResponse(res, 200, 'Top 10 de livros mais emprestados', livros);
    } catch (error) {
      next(error);
    }
  }

  async recomendados(req, res, next) {
    try {
      const livros = await this.livroService.recomendados(req.usuario.id_usuario);
      return successResponse(res, 200, 'Livros recomendados com sucesso', livros);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const livro = await this.livroService.findById(req.params.id);
      return successResponse(res, 200, 'Livro encontrado com sucesso', livro);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const livro = await this.livroService.create(req.body);
      LogService.registrarAcao(req, {
        acao: 'INCLUSAO',
        tabela: 'livros',
        registro_id: livro.id_livro,
        detalhes: `Livro ${livro.titulo} cadastrado`,
        status_code: 201,
      }).catch(() => {});
      return successResponse(res, 201, 'Livro cadastrado com sucesso', livro);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const livro = await this.livroService.update(req.params.id, req.body);
      LogService.registrarAcao(req, {
        acao: 'ALTERACAO',
        tabela: 'livros',
        registro_id: livro.id_livro,
        detalhes: `Livro ${livro.titulo} atualizado`,
      }).catch(() => {});
      return successResponse(res, 200, 'Livro atualizado com sucesso', livro);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await this.livroService.delete(req.params.id);
      LogService.registrarAcao(req, {
        acao: 'EXCLUSAO',
        tabela: 'livros',
        registro_id: req.params.id,
        detalhes: 'Livro excluido',
        status_code: 204,
      }).catch(() => {});
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async uploadImagem(req, res, next) {
    try {
      if (!req.file) {
        return next(new ErrorResponse('Arquivo de imagem nao enviado', 400));
      }

      const caminho = `/uploads/${req.file.filename}`;
      const livro = await this.livroService.updateImagem(req.params.id, caminho);
      LogService.registrarAcao(req, {
        acao: 'ALTERACAO',
        tabela: 'livros',
        registro_id: livro.id_livro,
        detalhes: `Imagem de capa atualizada para ${livro.titulo}`,
      }).catch(() => {});
      return successResponse(res, 200, 'Imagem enviada com sucesso', livro);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LivroController;
