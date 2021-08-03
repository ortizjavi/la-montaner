const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const setHeaders =  require('./setHeaders')


const server = express();

server.name = 'API';

//Seteamos los headers
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeaders) 

//Seteamos las rutas
server.use(cors());

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
