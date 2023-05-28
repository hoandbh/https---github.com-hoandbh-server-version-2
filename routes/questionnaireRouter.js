const express = require('express');
const questionnaireRouter = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

questionnaireRouter.route('/')
.get(questionnaireController.getAllQuestionnaires)
.post(questionnaireController.createQuestionnaire);

questionnaireRouter.route('/:id')
.get(questionnaireController.getQuestionnaireById)
.delete(questionnaireController.deleteQuestionnaire);

questionnaireRouter.route('/:id/full')
.get(questionnaireController.getFullQuestionnaire);

questionnaireRouter.route('/:id/generate-versions')
.post(questionnaireController.createVersionForQuestionnaire);

const partRouter = require('./partRouter');
questionnaireRouter.use('/:questionnaireId/part', partRouter);


module.exports = questionnaireRouter;

///////////
// const express = require('express');
// const questionnaireRouter = express.Router();
// const questionnaireController = require('../controllers/questionnaireController');

// questionnaireRouter.route('/')
// .get(questionnaireController.getAllQuestionnaires)
// .post(questionnaireController.createQuestionnaire);

// questionnaireRouter.route('/:id')
// .get(questionnaireController.getQuestionnaireById)
// .delete(questionnaireController.deleteQuestionnaire)

// questionnaireRouter.route('/:id/full')
// .get(questionnaireController.getFullQuestionnaire)

// questionnaireRouter.route('/:id/generate-versions')
// .post(questionnaireController.createVersionForQuestionnaire)

// module.exports = questionnaireRouter;

