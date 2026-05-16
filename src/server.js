const app = require('./app');
const env = require('./config/env');
const { connectMongo, closeMongo } = require('./config/mongo_database');

async function iniciarServidor() {
  try {
    await connectMongo();
    console.log('MongoDB conectado para logs');
  } catch (error) {
    console.warn('MongoDB indisponivel no momento. A API continuara executando sem persistir logs.');
    console.warn(error.message);
  }

  const server = app.listen(env.app.port, () => {
    console.log(`Servidor Biblioteca Geek rodando em http://localhost:${env.app.port}`);
  });

  process.on('SIGINT', async () => {
    await closeMongo();
    server.close(() => process.exit(0));
  });
}

iniciarServidor();
