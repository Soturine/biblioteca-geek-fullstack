const { ObjectId } = require('mongodb');
const IDAO = require('../interfaces/IDAO');
const { getLogsCollection } = require('../config/mongo_database');

class LogDAO extends IDAO {
  async create(log) {
    const collection = await getLogsCollection();
    // Documento flexível: MongoDB guarda tanto acessos simples quanto erros com stack_trace.
    const documento = {
      timestamp: log.timestamp || new Date(),
      usuario: log.usuario || 'anonimo',
      acao: log.acao || 'ACESSO',
      tabela: log.tabela || null,
      registro_id: log.registro_id || null,
      detalhes: log.detalhes || null,
      ip: log.ip || null,
      user_agent: log.user_agent || null,
      endpoint: log.endpoint || null,
      metodo: log.metodo || null,
      status_code: log.status_code || null,
      tempo_resposta: log.tempo_resposta || null,
      stack_trace: log.stack_trace || null,
    };

    const result = await collection.insertOne(documento);
    return { _id: result.insertedId, ...documento };
  }

  async findAll(filtros = {}) {
    const collection = await getLogsCollection();
    const query = {};

    if (filtros.usuario) {
      query.usuario = { $regex: filtros.usuario, $options: 'i' };
    }

    if (filtros.dataInicio || filtros.dataFim) {
      query.timestamp = {};

      if (filtros.dataInicio) {
        query.timestamp.$gte = new Date(`${filtros.dataInicio}T00:00:00`);
      }

      if (filtros.dataFim) {
        query.timestamp.$lte = new Date(`${filtros.dataFim}T23:59:59`);
      }
    }

    return collection.find(query).sort({ timestamp: -1 }).limit(1000).toArray();
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const collection = await getLogsCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, log) {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const collection = await getLogsCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: log });
    return this.findById(id);
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const collection = await getLogsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = LogDAO;
