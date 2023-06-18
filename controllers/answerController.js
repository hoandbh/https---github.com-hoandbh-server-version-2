const AnswerDal = require('../dal/answerDal');

class AnswerController {

  getAllAnsOfQst = async (req, res, next) => {
    try {
      const qstId = req.params.qstId;
      const answers = await AnswerDal.getAllAnsOfQst(qstId);
      if (!answers?.length)
        return res.status(204).send();
      res.json(answers);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  createNewAns = async (req, res, next) => {
    try {
      const { content, is_correct, question_id } = req.body;//to get all the feilds
      const answer = await AnswerDal.createNewAns({ content, is_correct, question_id });
      if (answer)
        return res.status(201).json(answer);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getAnsById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const pAns = await AnswerDal.getPossibleAnsById(id);
      if (qstnr.length)
        res.json(pAns)
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

}

module.exports = new AnswerController(); 