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

  const usuario = LogService.dadosUsuario(req);

  LogService.registrar({
    tipo: 'ERROR',
    usuario: usuario.usuario,
    perfil: usuario.perfil,
    acao: 'ERRO',
    tabela: null,
    registro_id: null,
    detalhes: err.message,
    ip: req.ip,
    user_agent: req.get('user-agent'),
    endpoint: req.originalUrl,
    metodo: req.method,
    status_code: statusCode,
    tempo_resposta_ms: null,
    query_params: req.query,
    body_resumido: req.body,
    erro: {
      mensagem: err.message,
      tipo: err.name || 'Error',
      origem: err.origem || 'middleware',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    },
    stack_trace: process.env.NODE_ENV === 'production' ? null : err.stack,
  }).catch(() => {});

  return res.status(statusCode).json(body);
}

module.exports = errorMiddleware;
