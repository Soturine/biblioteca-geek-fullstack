const express = require('express');
const LivroController = require('../controller/LivroController');
const { validarLivro } = require('../middleware/validation_middleware');
const { uploadImagem } = require('../middleware/upload_middleware');

class LivroRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new LivroController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/', this.controller.index.bind(this.controller));
    this.router.get('/:id', this.controller.show.bind(this.controller));
    this.router.post('/', validarLivro, this.controller.store.bind(this.controller));
    this.router.put('/:id', validarLivro, this.controller.update.bind(this.controller));
    this.router.delete('/:id', this.controller.destroy.bind(this.controller));
    this.router.post(
      '/:id/imagem',
      uploadImagem.single('imagem'),
      this.controller.uploadImagem.bind(this.controller),
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new LivroRouter().getRouter();
