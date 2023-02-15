const express = require('express')
const qstInQestionnaireRouter = express.Router();
const qstInQestionnaireController = require('../controllers/qst_in_questionnaireController');


qstInQestionnaireRouter.route('/')
.get(qstInQestionnaireController.getAllQst)
.post(qstInQestionnaireController.createQstInAnswer)
// const express = require('express')
// const possibleAnsRouter = express.Router();
// const pAnsController = require('../controllers/possibleAnsController');



// possibleAnsRouter.route('/')
// .get(pAnsController.getAllPossibleAnswers)
// .post(pAnsController.createPossibleAnswer)



// //localhost:3600/possible_answer/444
// possibleAnsRouter.route('/:id')
// .get(pAnsController.getPossibleAnsById)
// // .delete(pAnsController.delete)

// module.exports = questionnaireRouter;
module.exports = qstInQestionnaireRouter;