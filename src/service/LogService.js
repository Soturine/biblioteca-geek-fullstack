const IService = require('../interfaces/IService');
const LogDAO = require('../dao/LogDAO');
const { buildLogsXml } = require('../utils/xml_helper');

const CAMPOS_SENSIVEIS = ['senha', 'senha_hash', 'token', 'authorization'];

class LogService extends IService {
  constructor() {
    super();
    this.logDAO = new LogDAO();
  }

  async create(dados) {
    return this.registrar(dados);
  }

  sanitizarDados(valor) {
    if (!valor || typeof valor !== 'object') {
      return valor || null;
    }

    const copia = Array.isArray(valor) ? [] : {};

    for (const [chave, conteudo] of Object.entries(valor)) {
      if (CAMPOS_SENSIVEIS.includes(String(chave).toLowerCase())) {
        copia[chave] = '[REMOVIDO]';
      } else if (conteudo && typeof conteudo === 'object') {
        copia[chave] = this.sanitizarDados(conteudo);
      } else {
        copia[chave] = conteudo;
      }
    }

    return copia;
  }

  dadosUsuario(req, usuarioInformado, perfilInformado) {
    const usuario = req?.usuario || null;
    const perfil =
      perfilInformado || (usuario?.perfil ? String(usuario.perfil).toLowerCase() : 'anonimo');

    return {
      usuario: usuarioInformado || usuario?.email || 'anonimo',
      perfil: perfil === 'usuario' ? 'leitor' : perfil,
    };
  }

  async registrar(dados) {
    try {
      return await this.logDAO.create({
        timestamp: dados.timestamp || new Date(),
        tipo: dados.tipo || 'REQUEST',
        usuario: dados.usuario || 'anonimo',
        perfil: dados.perfil || 'anonimo',
        acao: dados.acao,
        tabela: dados.tabela,
        registro_id: dados.registro_id,
        detalhes: dados.detalhes,
        ip: dados.ip,
        user_agent: dados.user_agent,
        endpoint: dados.endpoint,
        metodo: dados.metodo,
        status_code: dados.status_code,
        tempo_resposta: dados.tempo_resposta,
        tempo_resposta_ms: dados.tempo_resposta_ms,
        query_params: this.sanitizarDados(dados.query_params),
        body_resumido: this.sanitizarDados(dados.body_resumido),
        erro: dados.erro ? this.sanitizarDados(dados.erro) : null,
        stack_trace: dados.stack_trace,
      });
    } catch (error) {
      console.warn('Aviso: não foi possível registrar log no MongoDB.', error.message);
      return null;
    }
  }

  async registrarAcao(req, dados) {
    const usuarioLog = this.dadosUsuario(req, dados.usuario, dados.perfil);

    return this.registrar({
      tipo: dados.tipo || 'BUSINESS',
      usuario: usuarioLog.usuario,
      perfil: usuarioLog.perfil,
      acao: dados.acao,
      tabela: dados.tabela,
      registro_id: dados.registro_id,
      detalhes: dados.detalhes,
      ip: req.ip,
      user_agent: req.get('user-agent'),
      endpoint: req.originalUrl,
      metodo: req.method,
      status_code: dados.status_code || 200,
      tempo_resposta_ms: dados.tempo_resposta_ms || null,
      query_params: req.query,
      body_resumido: req.body,
    });
  }

  async findAll(filtros = {}) {
    return this.logDAO.findAll(filtros);
  }

  async findById(id) {
    return this.logDAO.findById(id);
  }

  async update(id, dados) {
    return this.logDAO.update(id, dados);
  }

  async delete(id) {
    return this.logDAO.delete(id);
  }

  async exportarXml(filtros = {}) {
    const logs = await this.findAll(filtros);
    return buildLogsXml(logs);
  }
}

module.exports = new LogService();
