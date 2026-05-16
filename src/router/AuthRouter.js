const express = require('express');
const AuthController = require('../controller/AuthController');
const { validarLogin, validarRegistro } = require('../middleware/validation_middleware');

const router = express.Router();
const controller = new AuthController();

router.post('/login', validarLogin, controller.login.bind(controller));
router.post('/logout', controller.logout.bind(controller));
router.post('/register', validarRegistro, controller.register.bind(controller));

module.exports = router;
