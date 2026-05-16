const { MongoClient } = require('mongodb');
const env = require('./env');

let client;
let database;

async function connectMongo() {
  if (database) {
    return database;
  }

  // A conexão é reaproveitada para todos os logs, evitando reconectar a cada rota.
  client = new MongoClient(env.mongo.uri, {
    serverSelectionTimeoutMS: 1500,
  });
  await client.connect();
  database = client.db(env.mongo.database);
  // Índices simples ajudam nos filtros de data e usuário usados na exportação XML.
  await database.collection('logs').createIndex({ timestamp: -1 });
  await database.collection('logs').createIndex({ usuario: 1 });
  return database;
}

async function getLogsCollection() {
  const db = await connectMongo();
  return db.collection('logs');
}

async function closeMongo() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  connectMongo,
  getLogsCollection,
  closeMongo,
};
