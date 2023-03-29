//this is for testing different services during development!
//signed: Bracha

const express = require('express');
const servicesRouter = express.Router();
const servicesController = require('../controllers/servicesController');

servicesRouter.route('/:id')
.get(servicesController.versionToPDF)



module.exports = servicesRouter;

