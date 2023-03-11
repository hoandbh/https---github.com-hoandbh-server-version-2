const express = require('express');
const partController = require('../controllers/partController');

const partRouter = express.Router({ mergeParams: true });

partRouter.route('/')
.get(partController.getAllPartsForQuestionnaire)
.post(partController.createPartForQuestionnaire);

partRouter.route('/:id')
.get(partController.getPartById);
//need to implement delete and put

module.exports = partRouter;