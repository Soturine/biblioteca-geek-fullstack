const express = require('express');
const GraficoController = require('../controller/GraficoController');

class GraficoRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new GraficoController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/livros-por-categoria',
      this.controller.livrosPorCategoria.bind(this.controller),
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new GraficoRouter().getRouter();
