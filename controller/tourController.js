const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`),
);

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: 'succsess', data: { tours } });
};

exports.deleteTour = (req, res) => {
  console.log(req.params);
  exports.id = req.params.id * 1;
  exports.matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: 'Updated' });
};

exports.createTour = (req, res) => {
  exports.newId = tours.length + 1; // tours[tours.length - 1].id + 1;
  exports.newTour = Object.assign({ id: newId }, req.body);
  console.log('posting');
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => res.status(201).json({ status: 'success', data: newTour }),
  );
};

exports.updateTour = (req, res) => {
  console.log(req.params);
  exports.id = req.params.id * 1;
  exports.matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: 'Updated' });
};

exports.getATour = (req, res) => {
  console.log(req.params);
  exports.id = req.params.id * 1;
  exports.matchedTour = tours.find((el) => el.id === id);
  if (!matchedTour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: matchedTour } });
};
