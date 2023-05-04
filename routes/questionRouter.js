const express = require('express')
const questionRouter = express.Router({ mergeParams: true });
const questionController = require('../controllers/questionController');

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

questionRouter.route('/')
.get(questionController.getAllQstOfPart)
.post(questionController.createNewQst)

questionRouter.route('/:id')
.get(questionController.getQstById)
.delete(questionController.deleteQst)
.put(questionController.updateQst)

questionRouter.route('/:id/image')
.post(upload.single("file"), questionController.uploadImage);

const answerRouter = require('./answerRouter')
questionRouter.use('/:qstId/answer', answerRouter);

module.exports = questionRouter;