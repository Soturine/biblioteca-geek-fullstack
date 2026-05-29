const express = require('express');
const ReservaController = require('../controller/ReservaController');
const { validarReserva, validarStatusReserva } = require('../middleware/validation_middleware');
const { somenteAdmin } = require('../middleware/role_middleware');

class ReservaRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new ReservaController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/minhas', this.controller.minhas.bind(this.controller));
    this.router.get('/', somenteAdmin, this.controller.index.bind(this.controller));
    this.router.post('/', validarReserva, this.controller.store.bind(this.controller));
    this.router.put('/:id/cancelar', this.controller.cancelar.bind(this.controller));
    this.router.put(
      '/:id/status',
      somenteAdmin,
      validarStatusReserva,
      this.controller.status.bind(this.controller),
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ReservaRouter().getRouter();
