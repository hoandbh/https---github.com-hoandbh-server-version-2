const express = require('express');
const testRouter = express.Router();
const testController = require('../controllers/testController');

testRouter.route('/')
.post(testController.convertAnsSelectedInTestToScore);

module.exports = testRouter;
