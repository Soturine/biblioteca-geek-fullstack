const path = require('path');
const fs = require('fs');
const multer = require('multer');
const env = require('../config/env');
const ErrorResponse = require('../utils/ErrorResponse');

const uploadDir = path.join(__dirname, '..', '..', env.upload.dir);
fs.mkdirSync(uploadDir, { recursive: true });

const imagensPermitidas = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

const storageImagem = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    const nomeSeguro = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extensao}`;
    cb(null, nomeSeguro);
  },
});

function filtroImagem(req, file, cb) {
  const extensao = path.extname(file.originalname).toLowerCase();
  const mimetypeEsperado = imagensPermitidas[extensao];

  if (!mimetypeEsperado || file.mimetype !== mimetypeEsperado) {
    return cb(new ErrorResponse('Envie uma imagem PNG, JPG, JPEG ou WEBP valida', 400));
  }

  return cb(null, true);
}

function filtroJson(req, file, cb) {
  const extensao = path.extname(file.originalname).toLowerCase();
  if (file.mimetype !== 'application/json' && extensao !== '.json') {
    return cb(new ErrorResponse('Envie um arquivo JSON valido', 400));
  }
  return cb(null, true);
}

const uploadImagem = multer({
  storage: storageImagem,
  fileFilter: filtroImagem,
  limits: { fileSize: 2 * 1024 * 1024 },
});

const uploadJson = multer({
  storage: multer.memoryStorage(),
  fileFilter: filtroJson,
  limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = {
  uploadImagem,
  uploadJson,
};
