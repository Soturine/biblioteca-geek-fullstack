const express = require('express');
const CategoriaController = require('../controller/CategoriaController');
const { validarCategoria } = require('../middleware/validation_middleware');

const router = express.Router();
const controller = new CategoriaController();

router.get('/', controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', validarCategoria, controller.store.bind(controller));
router.put('/:id', validarCategoria, controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
