const IController = require('../interfaces/IController');
const AuthService = require('../service/AuthService');
const LogService = require('../service/LogService');
const { successResponse } = require('../utils/response_helper');

class AuthController extends IController {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  async login(req, res, next) {
    try {
      const resultado = await this.authService.login(req.body);
      LogService.registrarAcao(req, {
        usuario: resultado.usuario.email,
        acao: 'LOGIN',
        tabela: 'usuarios',
        registro_id: resultado.usuario.id_usuario,
        detalhes: 'Login realizado com sucesso',
        status_code: 200
      }).catch(() => {});
      return successResponse(res, 200, 'Login realizado com sucesso', resultado);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      LogService.registrarAcao(req, {
        acao: 'LOGOUT',
        tabela: 'usuarios',
        registro_id: req.usuario.id_usuario,
        detalhes: 'Logout realizado',
        status_code: 200
      }).catch(() => {});
      return successResponse(res, 200, 'Logout realizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const usuario = await this.authService.register(req.body);
      LogService.registrarAcao(req, {
        usuario: usuario.email,
        acao: 'INCLUSAO',
        tabela: 'usuarios',
        registro_id: usuario.id_usuario,
        detalhes: 'Usuario cadastrado',
        status_code: 201
      }).catch(() => {});
      return successResponse(res, 201, 'Usuario cadastrado com sucesso', usuario);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const usuarios = await this.authService.findAll();
      return successResponse(res, 200, 'Usuarios listados com sucesso', usuarios);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const usuario = await this.authService.findById(req.params.id);
      return successResponse(res, 200, 'Usuario encontrado com sucesso', usuario);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    return this.register(req, res, next);
  }

  async update(req, res, next) {
    try {
      const usuario = await this.authService.update(req.params.id, req.body);
      return successResponse(res, 200, 'Usuario atualizado com sucesso', usuario);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await this.authService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
