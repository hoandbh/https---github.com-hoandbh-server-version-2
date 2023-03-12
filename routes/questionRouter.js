const express = require('express')
const questionRouter = express.Router();
const questionController = require('../controllers/questionController');

questionRouter.route('/')
.get(questionController.getAllQst)
.post(questionController.createNewQst)

questionRouter.route('/ofPart/:partId')
.get(questionController.getAllQstOfPart)


module.exports = questionRouter;