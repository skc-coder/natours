'use strict';

// initialize
const express = require('express');
const fs = require('fs');
const { createSecureServer } = require('http2');
const morgan = require('morgan'); // for logging
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`),
);
// routing functions
const getAllTours = (req, res) => {
  res.status(200).json({ status: 'succsess', data: { tours } });
};

const deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: 'Updated' });
};

const createTour = (req, res) => {
  const newId = tours.length + 1; // tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log('posting');
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => res.status(201).json({ status: 'success', data: newTour }),
  );
};

const updateTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: 'Updated' });
};

const getATour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: matchedTour } });
};

const getAllUsers = (req, res) => {
  res.status(200).json({ status: 'success', data: { users } });
};
const getAUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'No user!' });
};
const deleteUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};
const updateUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};
const createUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};

// handling routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getATour).delete(deleteTour).patch(updateTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getAUser).delete(deleteUser).patch(updateUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// server start
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
