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
    await question.update({content,image_path:''});
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
    const questions = await Qst.findAll({
      where: {
        part_id: partId
      },
      include: [{
        model: Answer,
        as: 'answers'
      }]
    })
    this._sortQuestions(questions);
    return questions;
  }

  // const fullQuestoinnare = await Questionnaire.findOne(
  //   {
  //     where:{id:id},
  //     attributes:['owner','date'],
  //     include:'questions'
  //   }
  // )

  deleteQst = async (id) => {
    return await Qst.destroy({
      where: {
        id
      }
    });
  }

  addImagePath = async (id, path) => {
    await Qst.update(
      {image_path: path},
      {where: {id}}
    );
  } ;

  _sortQuestions = (questions) => {
    questions.sort((q1, q2) => (q1.serial_number_in_part - q2.serial_number_in_part));
    questions.forEach(q => {
      q.answers.sort((a1, a2) => (a1.serial_number - a2.serial_number))
    })
  }

}

module.exports = new QstInQuestionnaireDal();