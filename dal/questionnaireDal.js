const { model } = require('sequelize');
const { possible_answer, course } = require('../models/index');
const db = require('../models/index');


const Questionnaire = db.questionnaire
const PartInQuestionnaire = db.part_in_questionnaire
const QuestionsInQuestionnaire = db.qst_in_questionnaire
const Answer = db.possible_answer;
const Course = db.course;

class QuestionnaireDal {



  getAllQuestionnaires = async () => {
    //to add the name of course??
    const quests = await Questionnaire.findAll({});
    return quests;
  }

  getQuestionnaireById = async (id) => {
    var quest = await Questionnaire.findByPk(id);
    return quest;
  }

  getQuestionnairesByOwner = async (ow) => {
    var quest = await Questionnaire.findAll({
      where: { owner: ow }
    });
    return quest;

  }


  //add more functions for getting according to certain paramters

  getFullQuestionnaire = async (id) => {

    const fullQuestionnaire = await Questionnaire.findOne(
      {
        where: { id: id },
        include: [
          {
            model: PartInQuestionnaire,
            as: 'parts',
            include: [{
              model: QuestionsInQuestionnaire,
              as: 'questions',
              include: [{
                model: Answer,
                as: 'answers',
              }
              ]
            }]
          },
          {
            model: Course,
            as: 'course',
            attributes: ['name']
          }],
        order: [
          ['parts', 'serial_number', 'ASC']
        ]
      }
    )
    if(!fullQuestionnaire)
      return null;
    this._sortQuestionnaire(fullQuestionnaire);
    return fullQuestionnaire;
  }

  _sortQuestionnaire = (questionnaire) => {
    questionnaire.parts.sort((p1, p2) => (p1.serial_number - p2.serial_number));
    questionnaire.parts.forEach(p => {
      p.questions.sort((q1, q2) => (q1.serial_number_in_part - q2.serial_number_in_part));
      p.questions.forEach(q => {
        q.answers.sort((a1, a2) => (a1.serial_number - a2.serial_number));
      })
    })
  }

  createNewQuestionnaire = async (content) => {
    const quest = await Questionnaire.create(content);
    return quest;
  }

  deleteQuestionnaire = async (id) => {
    await Questionnaire.destroy({
      where: {
        id: id
      }
    })
  }

  //TODO updateQuestionnaire = async()=>
}


const questionnaireDal = new QuestionnaireDal();
module.exports = questionnaireDal;