const bcrypt = require('bcryptjs');
const IService = require('../interfaces/IService');
const Usuario = require('../model/Usuario');
const UsuarioDAO = require('../dao/UsuarioDAO');
const ErrorResponse = require('../utils/ErrorResponse');

class UsuarioService extends IService {
  constructor() {
    super();
    this.usuarioDAO = new UsuarioDAO();
  }

  async create(dados) {
    Usuario.validarCadastro(dados);

    const existente = await this.usuarioDAO.findByEmail(dados.email);
    if (existente) {
      throw new ErrorResponse('Email ja cadastrado', 400);
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);
    return this.usuarioDAO.create({
      nome: dados.nome.trim(),
      email: dados.email.trim().toLowerCase(),
      senha_hash: senhaHash,
      perfil: dados.perfil || 'usuario'
    });
  }

  async findAll() {
    return this.usuarioDAO.findAll();
  }

  async findById(id) {
    const usuario = await this.usuarioDAO.findById(id);
    if (!usuario) {
      throw new ErrorResponse('Usuario nao encontrado', 404);
    }
    return usuario;
  }

  async update(id, dados) {
    const atual = await this.findById(id);

    if (dados.email && dados.email !== atual.email) {
      const existente = await this.usuarioDAO.findByEmail(dados.email);
      if (existente && Number(existente.id_usuario) !== Number(id)) {
        throw new ErrorResponse('Email ja cadastrado', 400);
      }
    }

    return this.usuarioDAO.update(id, {
      nome: dados.nome || atual.nome,
      email: dados.email || atual.email,
      perfil: dados.perfil || atual.perfil
    });
  }

  async delete(id) {
    await this.findById(id);
    return this.usuarioDAO.delete(id);
  }
}

module.exports = UsuarioService;
