const express = require('express');
const LivroController = require('../controller/LivroController');
const { validarLivro } = require('../middleware/validation_middleware');
const { uploadImagem } = require('../middleware/upload_middleware');

const router = express.Router();
const controller = new LivroController();

router.get('/', controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', validarLivro, controller.store.bind(controller));
router.put('/:id', validarLivro, controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));
router.post('/:id/imagem', uploadImagem.single('imagem'), controller.uploadImagem.bind(controller));

module.exports = router;
