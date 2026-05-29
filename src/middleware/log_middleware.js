const LogService = require('../service/LogService');

function logMiddleware(req, res, next) {
  const inicio = Date.now();

  res.on('finish', () => {
    const tempo = Date.now() - inicio;
    const usuario = LogService.dadosUsuario(req);

    // O log de acesso é assíncrono para não atrasar a resposta HTTP.
    LogService.registrar({
      tipo: 'REQUEST',
      usuario: usuario.usuario,
      perfil: usuario.perfil,
      acao: 'ACESSO_ROTA',
      tabela: null,
      registro_id: null,
      detalhes: `${req.method} ${req.originalUrl}`,
      ip: req.ip,
      user_agent: req.get('user-agent'),
      endpoint: req.originalUrl,
      metodo: req.method,
      status_code: res.statusCode,
      tempo_resposta_ms: tempo,
      query_params: req.query,
      body_resumido: req.body,
    }).catch(() => {});
  });

  next();
}

module.exports = logMiddleware;
