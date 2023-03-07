const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const dbConfig = require('./dbConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', taskRoutes);

const { Pool } = require('pg');

const pool = new Pool(dbConfig);

console.log('develop branch')

pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    process.exit(1);
  }
  console.log('Conexión a la base de datos exitosa');
});

app.set('db', pool);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
