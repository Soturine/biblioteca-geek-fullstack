const express = require('express');
const LogController = require('../controller/LogController');

const router = express.Router();
const controller = new LogController();

router.get('/', controller.index.bind(controller));
router.get('/exportar/xml', controller.exportarXml.bind(controller));

module.exports = router;
