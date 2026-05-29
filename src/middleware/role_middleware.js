const LogService = require('../service/LogService');

const MENSAGEM_ACESSO_NEGADO = 'Acesso negado. Recurso permitido apenas para administradores.';

function perfilNormalizado(usuario) {
  const perfil = usuario && usuario.perfil ? String(usuario.perfil).toLowerCase() : 'anonimo';
  return perfil === 'usuario' ? 'leitor' : perfil;
}

function ehAdmin(usuario) {
  return perfilNormalizado(usuario) === 'admin';
}

function registrarAcessoNegado(req, statusCode) {
  LogService.registrarAcao(req, {
    acao: 'ACESSO_NEGADO',
    tabela: null,
    registro_id: null,
    detalhes: MENSAGEM_ACESSO_NEGADO,
    status_code: statusCode,
  }).catch(() => {});
}

function permitirPerfis(perfisPermitidos = []) {
  const perfis = perfisPermitidos.map((perfil) => String(perfil).toLowerCase());

  return (req, res, next) => {
    const perfil = perfilNormalizado(req.usuario);

    if (perfis.includes(perfil)) {
      return next();
    }

    registrarAcessoNegado(req, 403);
    return res.status(403).json({
      success: false,
      erro: true,
      mensagem: MENSAGEM_ACESSO_NEGADO,
      message: MENSAGEM_ACESSO_NEGADO,
      data: null,
    });
  };
}

const somenteAdmin = permitirPerfis(['admin']);

module.exports = {
  MENSAGEM_ACESSO_NEGADO,
  perfilNormalizado,
  ehAdmin,
  permitirPerfis,
  somenteAdmin,
};
