const ErrorResponse = require('../utils/ErrorResponse');

class Usuario {
  constructor({ id_usuario, nome, email, senha, senha_hash, perfil = 'usuario', criado_em }) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.senha_hash = senha_hash;
    this.perfil = perfil;
    this.criado_em = criado_em;
  }

  static validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  }

  static validarCadastro(dados) {
    const erros = [];

    if (!dados.nome || String(dados.nome).trim().length < 3) {
      erros.push('Nome deve ter pelo menos 3 caracteres');
    }

    if (!this.validarEmail(dados.email)) {
      erros.push('Email invalido');
    }

    if (!dados.senha || String(dados.senha).length < 6) {
      erros.push('Senha deve ter no minimo 6 caracteres');
    }

    if (erros.length) {
      throw new ErrorResponse('Dados de usuario invalidos', 400, erros);
    }
  }

  static validarLogin(dados) {
    const erros = [];

    if (!this.validarEmail(dados.email)) {
      erros.push('Email invalido');
    }

    if (!dados.senha) {
      erros.push('Senha obrigatoria');
    }

    if (erros.length) {
      throw new ErrorResponse('Dados de login invalidos', 400, erros);
    }
  }
}

module.exports = Usuario;
