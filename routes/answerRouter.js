const express = require('express')
const answerRouter = express.Router({ mergeParams: true });
const answerController = require('../controllers/answerController');
const verifyJWT = require('../middleware/verifyJWT');

answerRouter.use(verifyJWT);
answerRouter.route('/')
    .get(answerController.getAllAnsOfQst)
    .post(answerController.createNewAns)

answerRouter.route('/:id')
    .get(answerController.getAnsById)


module.exports = answerRouter;
