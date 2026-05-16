const IService = require('../interfaces/IService');
const LogDAO = require('../dao/LogDAO');
const { buildLogsXml } = require('../utils/xml_helper');

class LogService extends IService {
  constructor() {
    super();
    this.logDAO = new LogDAO();
  }

  async create(dados) {
    return this.registrar(dados);
  }

  async registrar(dados) {
    return this.logDAO.create({
      timestamp: dados.timestamp || new Date(),
      usuario: dados.usuario || 'anonimo',
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
      stack_trace: dados.stack_trace
    });
  }

  async registrarAcao(req, dados) {
    return this.registrar({
      usuario: req.usuario ? req.usuario.email : (dados.usuario || 'anonimo'),
      acao: dados.acao,
      tabela: dados.tabela,
      registro_id: dados.registro_id,
      detalhes: dados.detalhes,
      ip: req.ip,
      user_agent: req.get('user-agent'),
      endpoint: req.originalUrl,
      metodo: req.method,
      status_code: dados.status_code || 200,
      tempo_resposta: null
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
