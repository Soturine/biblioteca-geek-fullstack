const Usuario = require('../model/Usuario');
const Autor = require('../model/Autor');
const Categoria = require('../model/Categoria');
const Livro = require('../model/Livro');
const Emprestimo = require('../model/Emprestimo');

function validarLogin(req, res, next) {
  try {
    Usuario.validarLogin(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

function validarRegistro(req, res, next) {
  try {
    Usuario.validarCadastro(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

function validarAutor(req, res, next) {
  try {
    Autor.validar(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

function validarCategoria(req, res, next) {
  try {
    Categoria.validar(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

function validarLivro(req, res, next) {
  try {
    Livro.validar(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

function validarEmprestimo(req, res, next) {
  try {
    if (!req.body.id_usuario && req.usuario) {
      req.body.id_usuario = req.usuario.id_usuario;
    }
    Emprestimo.validar(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validarLogin,
  validarRegistro,
  validarAutor,
  validarCategoria,
  validarLivro,
  validarEmprestimo,
};
