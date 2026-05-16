const express = require('express');
const AuthController = require('../controller/AuthController');
const { validarLogin, validarRegistro } = require('../middleware/validation_middleware');

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new AuthController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.post('/login', validarLogin, this.controller.login.bind(this.controller));
    this.router.post('/logout', this.controller.logout.bind(this.controller));
    this.router.post('/register', validarRegistro, this.controller.register.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AuthRouter().getRouter();
