const express = require('express');
const RelatorioController = require('../controller/RelatorioController');

class RelatorioRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new RelatorioController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/livros', this.controller.livros.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new RelatorioRouter().getRouter();
