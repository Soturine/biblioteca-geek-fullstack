const express = require('express');
const AutorController = require('../controller/AutorController');
const { validarAutor } = require('../middleware/validation_middleware');
const { somenteAdmin } = require('../middleware/role_middleware');

class AutorRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new AutorController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.use(somenteAdmin);
    this.router.get('/', this.controller.index.bind(this.controller));
    this.router.get('/:id', this.controller.show.bind(this.controller));
    this.router.post('/', validarAutor, this.controller.store.bind(this.controller));
    this.router.put('/:id', validarAutor, this.controller.update.bind(this.controller));
    this.router.delete('/:id', this.controller.destroy.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AutorRouter().getRouter();
