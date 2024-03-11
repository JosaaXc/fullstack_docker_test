const express = require('express');
const cors = require('cors');
const pool = require('./bd/index');
const Model = require('./models/model');
const controller = require('./controllers/controller');
const logger = require('./middlewares/logger');

const model = new Model(pool);

model.createTable()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(logger.logRequest);

    app.post('/data', controller.postData);

    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
  })
  .catch(err => {
    console.error('Error al crear la tabla:', err);
  });