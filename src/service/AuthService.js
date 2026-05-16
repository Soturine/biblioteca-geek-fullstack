const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IService = require('../interfaces/IService');
const Usuario = require('../model/Usuario');
const UsuarioDAO = require('../dao/UsuarioDAO');
const UsuarioService = require('./UsuarioService');
const ErrorResponse = require('../utils/ErrorResponse');
const env = require('../config/env');

class AuthService extends IService {
  constructor() {
    super();
    this.usuarioDAO = new UsuarioDAO();
    this.usuarioService = new UsuarioService();
  }

  async login(dados) {
    Usuario.validarLogin(dados);

    const usuario = await this.usuarioDAO.findByEmail(String(dados.email).trim().toLowerCase());
    if (!usuario) {
      throw new ErrorResponse('Email ou senha invalidos', 401);
    }

    const senhaOk = await bcrypt.compare(dados.senha, usuario.senha_hash);
    if (!senhaOk) {
      throw new ErrorResponse('Email ou senha invalidos', 401);
    }

    const payload = {
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    };

    const token = jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
    delete usuario.senha_hash;

    return { token, usuario };
  }

  async register(dados) {
    return this.usuarioService.create(dados);
  }

  async create(dados) {
    return this.register(dados);
  }

  async findAll() {
    return this.usuarioService.findAll();
  }

  async findById(id) {
    return this.usuarioService.findById(id);
  }

  async update(id, dados) {
    return this.usuarioService.update(id, dados);
  }

  async delete(id) {
    return this.usuarioService.delete(id);
  }
}

module.exports = AuthService;
