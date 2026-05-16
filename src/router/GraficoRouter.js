const express = require('express');
const GraficoController = require('../controller/GraficoController');

const router = express.Router();
const controller = new GraficoController();

router.get('/livros-por-categoria', controller.livrosPorCategoria.bind(controller));

module.exports = router;
