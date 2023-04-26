const db = require('../models/index');
const Qst = db.qst_in_questionnaire;
const Answer = db.possible_answer;


class QstInQuestionnaireDal {

  getAllQst = async () => {
    const questions = await Qst.findAll({});
    return questions;
  }

  createNewQst = async (content) => {
    const question = await Qst.create(content);
    return question;
  }

  updateQst = async (id, content) => {
    const question = await Qst.findByPk(id);
    if (!question) {
      return null;
    }
    await question.update({content});
    return question;
  }

  getQstById = async (id) => {
    const question = await Qst.findOne({
      where: {  
        id
      },
      include: [{
        model: Answer,
        as: 'answers'
      }]
    })
    return question;
  }
  
  getAllQstOfPart = async (partId) => {
    const qsts = await Qst.findAll({
      where: {
        part_id: partId
      },
      include: [{
        model: Answer,
        as: 'answers'
      }]
    })
    return qsts;
  }

  // const fullQuestoinnare = await Questionnaire.findOne(
  //   {
  //     where:{id:id},
  //     attributes:['owner','date'],
  //     include:'questions'
  //   }
  // )

  deleteQst = async (id) => {
    await Qst.destroy({
      where: {
        id: id
      }
    });
  }

}

const qstInQuestionnaireDal = new QstInQuestionnaireDal();
module.exports = qstInQuestionnaireDal;