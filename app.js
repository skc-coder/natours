'use strict';
const tourRouter = require(`${__dirname}/router/tourRouter.js`);
const userRouter = require(`${__dirname}/router/userRouter.js`);

// initialize
const express = require('express');
const morgan = require('morgan'); // for logging
const app = express();

// Middlewares
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// router setup
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
