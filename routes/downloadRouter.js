const express = require('express');
const downloadRouter = express.Router();
const downloadController = require('../controllers/downloadController');

downloadRouter.route('/:questionnaireId')
.get(downloadController.downloadFolder)

module.exports = downloadRouter;

