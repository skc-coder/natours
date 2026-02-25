const express = require('express');
const tourController = require('./../controller/tourController.js');

Router = express.Router();

Router.param('id', tourController.checkID);

Router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

Router.route('/:id')
  .get(tourController.getATour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);
module.exports = Router;
