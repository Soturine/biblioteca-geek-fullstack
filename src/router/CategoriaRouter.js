const express = require('express');
const CategoriaController = require('../controller/CategoriaController');
const { validarCategoria } = require('../middleware/validation_middleware');
const { somenteAdmin } = require('../middleware/role_middleware');

class CategoriaRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new CategoriaController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/', this.controller.index.bind(this.controller));
    this.router.get('/:id', this.controller.show.bind(this.controller));
    this.router.post(
      '/',
      somenteAdmin,
      validarCategoria,
      this.controller.store.bind(this.controller),
    );
    this.router.put(
      '/:id',
      somenteAdmin,
      validarCategoria,
      this.controller.update.bind(this.controller),
    );
    this.router.delete('/:id', somenteAdmin, this.controller.destroy.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new CategoriaRouter().getRouter();
