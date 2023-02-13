const express = require('express');
const questionnaireRouter = express.Router();
const qstnrController = require('../controllers/questionnaireController');

questionnaireRouter.route('/')
.get(qstnrController.getAllQuestionnaires)
.post(qstnrController.createQuestionnaire);

questionnaireRouter.route('/:id')
.get(qstnrController.getQuestionnaireById)
.delete(qstnrController.deleteQuestionnaire)
