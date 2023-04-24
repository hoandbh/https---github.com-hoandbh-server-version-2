const express = require('express');
const versionRouter = express.Router();
const versionController = require('../controllers/versionController');



versionRouter.route('/one')
.post(versionController.createOneVersion)

versionRouter.route('/questionnaire/:id')
.get(versionController.getVersionsByQuestionnaire);

versionRouter.route('/:id')
.get(versionController.getVersionById)
.delete(versionController.deleteVersion);

versionRouter.route('/versionspdf/:questionnaireId')
.get(versionController.getVersionsPDFByQuestionnaire)

module.exports = versionRouter;
