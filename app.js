'use strict';
const tourRouter = require(`${__dirname}/router/tourRouter.js`);
const userRouter = require(`${__dirname}/router/userRouter.js`);

// initialize
const express = require('express');
const morgan = require('morgan'); // for logging
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
