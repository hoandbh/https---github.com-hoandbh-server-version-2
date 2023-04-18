const express = require('express')
const questionRouter = express.Router({ mergeParams: true });
const questionController = require('../controllers/questionController');

questionRouter.route('/')
.get(questionController.getAllQstOfPart)
.post(questionController.createNewQst)

questionRouter.route('/:id')
.get(questionController.getQstById)
.delete(questionController.deleteQst)
.put(questionController.updateQst)

const answerRouter = require('./answerRouter')
questionRouter.use('/:qstId/answer', answerRouter);

module.exports = questionRouter;