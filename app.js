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

// handling routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ status: 'succsess', data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.length + 1; // tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log('posting');
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => res.status(201).json({ status: 'success', data: newTour }),
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: matchedTour } });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: 'Updated' });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: 'Updated' });
});

// server listening
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
