const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const databaseName = process.env.MONGO_DATABASE || 'biblioteca_geek_logs';

async function main() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 2500,
  });

  try {
    await client.connect();
    const db = client.db(databaseName);
    const logs = db.collection('logs');
    const total = await logs.countDocuments();
    const ultimo = await logs.find().sort({ timestamp: -1 }).limit(1).toArray();

    console.log('MongoDB conectado com sucesso.');
    console.log(`URI: ${uri}`);
    console.log(`Banco usado: ${databaseName}`);
    console.log('Collection: logs');
    console.log(`Quantidade de logs: ${total}`);

    if (ultimo[0]) {
      console.log(
        `Ultimo log: ${ultimo[0].acao || 'ACAO_NAO_INFORMADA'} - ${ultimo[0].usuario || 'anonimo'}`,
      );
    }
  } catch (error) {
    console.error('Nao foi possivel conectar ao MongoDB.');
    console.error(`URI testada: ${uri}`);
    console.error('Verifique se o MongoDB esta aberto. No Windows, use:');
    console.error(
      '"C:\\Program Files\\MongoDB\\Server\\8.0\\bin\\mongod.exe" --dbpath C:\\data\\db',
    );
    console.error(`Detalhe tecnico: ${error.message}`);
    process.exit(1);
  } finally {
    await client.close().catch(() => {});
  }
}

main();
