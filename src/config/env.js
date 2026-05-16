require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'biblioteca_geek',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
    database: process.env.MONGO_DATABASE || 'biblioteca_geek_logs',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'segredo_local_biblioteca_geek',
    expiresIn: process.env.JWT_EXPIRES_IN || '2h',
  },
  upload: {
    dir: process.env.UPLOAD_DIR || 'public/uploads',
  },
};
