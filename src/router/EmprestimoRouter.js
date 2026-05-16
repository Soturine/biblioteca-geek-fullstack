const express = require('express');
const EmprestimoController = require('../controller/EmprestimoController');
const { validarEmprestimo } = require('../middleware/validation_middleware');

const router = express.Router();
const controller = new EmprestimoController();

router.get('/', controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', validarEmprestimo, controller.store.bind(controller));
router.put('/:id', validarEmprestimo, controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
