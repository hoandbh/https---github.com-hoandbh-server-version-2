const express = require('express');
const partQstnrRouter = express.Router();
const partQstnrController = require('../controllers/partQuestionnaireController');


partQstnrRouter.route('/')
.get(partQstnrController.getAllParts)

partQstnrRouter.route('/:id')
.get(partQstnrController.getPartById)



module.exports = partQstnrRouter;