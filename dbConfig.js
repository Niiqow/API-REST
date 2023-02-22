const dbConfig = {
    user: process.env.DB_USER || 'niiqow',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'my-app',
    password: process.env.DB_PASSWORD || '2212',
    port: process.env.DB_PORT || 5432,
  };
  
  module.exports = dbConfig;
  