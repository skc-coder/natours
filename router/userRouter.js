const userController = require('./../controller/userController.js');
const express = require('express')
const Router = express.Router();

Router.route('/').get(userController.getAllUsers).post(userController.createUser);
Router.route('/:id').get(userController.getAUser).delete(userController.deleteUser).patch(userController.updateUser);

module.exports = Router;
