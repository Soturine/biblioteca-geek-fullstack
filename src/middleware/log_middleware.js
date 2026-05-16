const LogService = require('../service/LogService');

function logMiddleware(req, res, next) {
  const inicio = Date.now();

  res.on('finish', () => {
    const tempo = Date.now() - inicio;

    // O log de acesso é assíncrono para não atrasar a resposta HTTP.
    LogService.registrar({
      usuario: req.usuario ? req.usuario.email : 'anonimo',
      acao: 'ACESSO_ROTA',
      tabela: null,
      registro_id: null,
      detalhes: `${req.method} ${req.originalUrl}`,
      ip: req.ip,
      user_agent: req.get('user-agent'),
      endpoint: req.originalUrl,
      metodo: req.method,
      status_code: res.statusCode,
      tempo_resposta: tempo,
    }).catch(() => {});
  });

  next();
}

module.exports = logMiddleware;
