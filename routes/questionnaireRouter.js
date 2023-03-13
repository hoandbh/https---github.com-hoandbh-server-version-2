const express = require('express');
const questionnaireRouter = express.Router();
const qstnrController = require('../controllers/questionnaireController');

questionnaireRouter.route('/')
.get(qstnrController.getAllQuestionnaires)
.post(qstnrController.createQuestionnaire);

questionnaireRouter.route('/:id')
.get(qstnrController.getQuestionnaireById)
.delete(qstnrController.deleteQuestionnaire)

questionnaireRouter.route('/owner/:ownerId')
.get(qstnrController.getQuestionnairesByOwner)

questionnaireRouter.route('/full/:id')
.get(qstnrController.getFullQuestionnaire)

const partRouter = require('./partRouter');
questionnaireRouter.use('/:questionnaireId/part', partRouter);

module.exports = questionnaireRouter;
