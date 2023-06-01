const express = require('express');
const downloadRouter = express.Router();
const downloadController = require('../controllers/downloadController');
const verifyJWT = require('../middleware/verifyJWT');

downloadRouter.use(verifyJWT);
downloadRouter.route('/:questionnaireId')
    .get(downloadController.downloadFolder)

module.exports = downloadRouter;
