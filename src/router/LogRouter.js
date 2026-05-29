const express = require('express');
const LogController = require('../controller/LogController');
const { somenteAdmin } = require('../middleware/role_middleware');

class LogRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new LogController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.use(somenteAdmin);
    this.router.get('/', this.controller.index.bind(this.controller));
    this.router.get('/exportar/xml', this.controller.exportarXml.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new LogRouter().getRouter();
