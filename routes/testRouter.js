const express = require('express');
const testRouter = express.Router();
const testController = require('../controllers/testController');
const verifyJWT = require('../middleware/verifyJWT');

testRouter.use(verifyJWT);
testRouter.route('/')
    .post(testController.convertAnsSelectedInTestToScore);

module.exports = testRouter;
