const express = require('express');
const RelatorioController = require('../controller/RelatorioController');

const router = express.Router();
const controller = new RelatorioController();

router.get('/livros', controller.livros.bind(controller));

module.exports = router;
