const dbConfig = {
    user: process.env.DB_USER = "postgre_admin",
    host: process.env.DB_HOST = "lab-dev-postgre001.postgres.database.azure.com",
    database: process.env.DB_NAME = "lab-dev-postgre001",
    password: process.env.DB_PASSWORD = "C0ntr@s3n14!",
    port: process.env.DB_PORT = "5432",
  };
  



  module.exports = dbConfig;
