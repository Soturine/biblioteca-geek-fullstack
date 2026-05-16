const express = require('express');
const AutorController = require('../controller/AutorController');
const { validarAutor } = require('../middleware/validation_middleware');

const router = express.Router();
const controller = new AutorController();

router.get('/', controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', validarAutor, controller.store.bind(controller));
router.put('/:id', validarAutor, controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
