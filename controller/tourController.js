const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`),
);

exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  const matchedTour = tours.find((el) => el.id === val);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: 'succsess', data: { tours } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: 'Updated' });
};

exports.createTour = (req, res) => {
  const newId = tours.length + 1; // tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => res.status(201).json({ status: 'success', data: newTour }),
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({ status: 'success', data: 'Updated' });
};

exports.getATour = (req, res) => {
  res.status(200).json({ status: 'success', data: { tour: matchedTour } });
};
