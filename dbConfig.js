const dbConfig = {
    user: process.env.DB_USER || "myuser",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "my-app",
    password: process.env.DB_PASSWORD || "123",
    port: process.env.DB_PORT || "5432",
  };
  



  module.exports = dbConfig;
