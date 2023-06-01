const express = require('express');
const scoreRouter = express.Router();
const scoreController = require('../controllers/scoreController');
const verifyJWT = require('../middleware/verifyJWT');

scoreRouter.use(verifyJWT);
scoreRouter.route('/')
    .get(scoreController.getAllScores)
    .post(scoreController.createNewScore);

scoreRouter.route('/search')
    .get(scoreController.search)

scoreRouter.route('/:id')
    .get(scoreController.getScoreById)
    .delete(scoreController.deleteScore)

module.exports = scoreRouter;
