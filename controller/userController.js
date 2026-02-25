const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: 'success', data: { users } });
};
exports.getAUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'No user!' });
};
exports.deleteUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};
exports.updateUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};
exports.createUser = (req, res) => {
  res.status(400).json({ status: 'fail', data: 'Not implemented!' });
};
