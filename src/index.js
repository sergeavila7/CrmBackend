const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
// Conectar con Mongo
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => console.log('BD Connect', db.connection.name))
  .catch((error) => console.log(error));
// Crer Servidor
const app = express();
// Morgan no permite ver el estatus de las peticiones en la consola
app.use(morgan('dev'));
// Public
// app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'uploads')));

// Habilitar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dominio(s) para recibir peticiones

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    // Verificar si la peticion proviene de un servidor de la lista
    const verify = whitelist.some((dominio) => dominio === origin);
    if (verify) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

// Habilitar cors
app.use(cors(corsOptions));
// Routes of the app
app.use('/', routes());

// Port
app.listen(process.env.PORT || 5000, () => {
  console.log('¡Servidor web Express en ejecución!');
});
