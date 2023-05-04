//V
const db = require('../models/index');
const Questionnaire = db.questionnaire;
const Version = db.version;
const PartsInVersion = db.part_in_version;
const QuestionsInVersion = db.qst_in_version;
const AnswersInVersion = db.ans_in_version;
const OriginalParts = db.part_in_questionnaire
const OriginalQuestions = db.qst_in_questionnaire
const OriginalAnswers = db.possible_answer;
const Course = db.course;



class VersionDal {

  getFullVersion = async (id) => {
    const version = await Version.findOne(
      {
        where: { id },
        include: [
          {
            model: PartsInVersion,
            as: 'parts',
            include: [
              {
                model: QuestionsInVersion,
                as: 'questions',
                include: [
                  {
                    model: AnswersInVersion,
                    as: 'answers',
                    include: [
                      {
                        model: OriginalAnswers,
                        as: 'original_answer'
                      }
                    ]
                  },
                  {
                    model: OriginalQuestions,
                    as: 'original_question'
                  }
                ],
                order: [
                  [{ model: AnswersInVersion, as: 'answers' }, 'serial_number', 'ASC']
                ]
              },
              {
                model: OriginalParts,
                as: 'original_part'
              }
            ],
            order: [
              [{ model: QuestionsInVersion, as: 'questions' }, 'serial_number_in_part', 'ASC'],
            ]
          },
          {
            model: Questionnaire,
            as: 'original_questionnaire',
            attributes: ['date'],
            include: [
              {
                model: Course,
                as: 'course',
                attributes: ['name']
              }
            ]  
          }
        ],
        order: [
          [{ model: PartsInVersion, as: 'parts' }, 'serial_number', 'ASC']
        ]
      }
    )
    return version;
  }


  getAllVersions = async () => {
    const versions = await Version.findAll({});
    return versions;
  }

  getVersionById = async (id) => {
    var version = await Version.findByPk(id);
    return version;
  }

  createVersions = async (arr) => {
    const versions = await Version.bulkCreate(arr);
    return versions;
  }

  createVersion = async (q_id) => {
    const version = await Version.create({ 'questionnaire': 1, 'pdf_path': '/localhost/333' });
    return version;
  }

  deleteVersion = async (id) => {
    await Version.destroy({ where: { id } });
  }

  getVersionsByQuestionnaire = async (id) => {
    const version = await Version.findAll({
      where: {
        questionnaire_id: id
      }
    });
    return version;
  }

}

const versionDal = new VersionDal();
module.exports = versionDal;


