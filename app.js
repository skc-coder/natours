'use strict';

// initialize
const express = require('express');
const fs = require('fs');

const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`),
);

// adding middleware
app.use(express.json());

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

// handling routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getATour)
  .delete(deleteTour)
  .patch(updateTour);

// server listening
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
