const express = require('express');
const JsonController = require('../controller/JsonController');
const { uploadJson } = require('../middleware/upload_middleware');

class JsonRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new JsonController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/exportar/:entidade', this.controller.exportar.bind(this.controller));
    this.router.post(
      '/importar/:entidade',
      uploadJson.single('arquivo'),
      this.controller.importar.bind(this.controller),
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new JsonRouter().getRouter();
