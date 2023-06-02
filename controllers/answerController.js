const AnswerDal = require('../dal/answerDal');

class AnswerController {

  getAllAnsOfQst = async (req, res, next) => {
    const qstId = req.params.qstId;
    const answers = await AnswerDal.getAllAnsOfQst(qstId);
    if (!answers?.length)
      return res.status(204).send();
    res.json(answers);
  }

  createNewAns = async(req, res, next) => {
    const { content,is_correct,question_id } = req.body;//to get all the feilds
    const answer = await AnswerDal.createNewAns({content,is_correct,question_id});
    if(answer)
      return res.status(201).json(answer);
  }
     
  getAnsById = async (req, res, next) => {
    const id = req.params.id;
    const pAns = await AnswerDal.getPossibleAnsById(id);
    if (qstnr.length)
      res.json(pAns)
    else
      res.status(204).send();
  }

}
 
module.exports = new AnswerController(); 