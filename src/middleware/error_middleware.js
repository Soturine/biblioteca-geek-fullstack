const LogService = require('../service/LogService');

function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor';

  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'Arquivo maior que o limite permitido';
  }

  const body = {
    success: false,
    message,
    data: null,
    error: {
      name: err.name || 'Error',
      details: err.errors || null,
    },
  };

  LogService.registrar({
    usuario: req.usuario ? req.usuario.email : 'anonimo',
    acao: 'ERRO',
    tabela: null,
    registro_id: null,
    detalhes: {
      mensagem: err.message,
      stack_trace: err.stack,
    },
    ip: req.ip,
    user_agent: req.get('user-agent'),
    endpoint: req.originalUrl,
    metodo: req.method,
    status_code: statusCode,
    tempo_resposta: null,
    stack_trace: err.stack,
  }).catch(() => {});

  return res.status(statusCode).json(body);
}

module.exports = errorMiddleware;
