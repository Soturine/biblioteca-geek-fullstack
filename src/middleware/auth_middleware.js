const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ErrorResponse = require('../utils/ErrorResponse');

const rotasPublicas = [
  { metodo: 'POST', caminho: '/api/v1/auth/login' },
  { metodo: 'POST', caminho: '/api/v1/auth/register' },
];

function rotaPublica(req) {
  if (!req.path.startsWith('/api/')) {
    return true;
  }

  return rotasPublicas.some((rota) => rota.metodo === req.method && rota.caminho === req.path);
}

function authMiddleware(req, res, next) {
  if (rotaPublica(req)) {
    return next();
  }

  const authorization = req.headers.authorization || '';
  const [tipo, token] = authorization.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return next(new ErrorResponse('Token JWT nao informado', 401));
  }

  try {
    const payload = jwt.verify(token, env.jwt.secret);
    req.usuario = {
      id: payload.id,
      id_usuario: payload.id,
      nome: payload.nome,
      email: payload.email,
      perfil: payload.perfil,
    };
    return next();
  } catch (error) {
    return next(new ErrorResponse('Token JWT invalido ou expirado', 401));
  }
}

module.exports = authMiddleware;
