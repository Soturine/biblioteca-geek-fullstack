const express = require('express');
const EmprestimoController = require('../controller/EmprestimoController');
const { validarEmprestimo } = require('../middleware/validation_middleware');

class EmprestimoRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new EmprestimoController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/', this.controller.index.bind(this.controller));
    this.router.get('/:id', this.controller.show.bind(this.controller));
    this.router.post('/', validarEmprestimo, this.controller.store.bind(this.controller));
    this.router.put('/:id', validarEmprestimo, this.controller.update.bind(this.controller));
    this.router.delete('/:id', this.controller.destroy.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new EmprestimoRouter().getRouter();
