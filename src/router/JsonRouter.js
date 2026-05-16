const express = require('express');
const JsonController = require('../controller/JsonController');
const { uploadJson } = require('../middleware/upload_middleware');

const router = express.Router();
const controller = new JsonController();

router.get('/exportar/:entidade', controller.exportar.bind(controller));
router.post('/importar/:entidade', uploadJson.single('arquivo'), controller.importar.bind(controller));

module.exports = router;
