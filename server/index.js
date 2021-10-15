const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./config/logger');

const api = require('./api/v1');

//Init app
const app = express();

//setup cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders:['Accept','Content-Type','Authorization']
  })
);
app.use(
  morgan('combined', { stream: { write: (message) => logger.info(message) } })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);
app.use('/api/v1', api);

//No route found handler
app.use((req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

//Error handler
app.use((err, req, res, next) => {
  const { message, level = 'error' } = err;
  let { statusCode = 500 } = err;
  //const log = `${logger.header(req)} ${statusCode} ${message}`;

  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  //logger[level](log);

  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
});

module.exports = app;
