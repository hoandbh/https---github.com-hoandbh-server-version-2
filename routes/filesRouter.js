const express = require('express');
const filesRouter = express.Router();
const filesController = require('../controllers/filesController')

filesRouter.get('/versions', (req, res, next)=>{
  res.download('files/Header.PNG');
});

filesRouter.route('/versions/:qId')
.get(filesController.getVersionsOfQ)

module.exports = filesRouter;