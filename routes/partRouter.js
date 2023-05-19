const express = require('express');
const partController = require('../controllers/partController');
const partRouter = express.Router({ mergeParams: true });

partRouter.route('/')
.get(partController.getAllPartsForQuestionnaire)
.post(partController.createPartForQuestionnaire);

partRouter.route('/:id')
.get(partController.getPartById)   
.delete(partController.deletePart)
.patch(partController.changePartName);
//need to implement and put

const questionRouter = require('./questionRouter')
partRouter.use('/:partId/question', questionRouter);

module.exports = partRouter;