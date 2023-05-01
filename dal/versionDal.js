//V
const { Op } = require('sequelize');
// const { version: Version } = require('../models');
const db = require('../models/index');
const Version = db.version;
const PartInVersion = db.part_in_version;
const QuestionsInVersion = db.qst_in_version;
const AnsInVersion = db.ans_in_version;
const PartInQuestionnaire = db.part_in_questionnaire
const QuestionsInQuestionnaire = db.qst_in_questionnaire
const Answer = db.possible_answer;

const where = (id) => ({
  where: {
    id: id
  }
});
   
class VersionDal {

  getFullVersion = async (id) => {
    const versions = await Version.findOne(
      {
        where: { id },
        include: [{
          model: PartInVersion,
          as: 'parts',
          include: [{
            model: QuestionsInVersion,
            as:'questions',
          }]
          // include: [
          //   {    
          //     model: PartInQuestionnaire,
          //     attributes: ['headline']
          //   },
          //   {
          //     model: QuestionsInVersion,
          //     as: 'questions',
          //     attributes: ['serial_number_in_part'],
          //     include: [   
          //       {
          //         model: QuestionsInQuestionnaire,
          //         attributes: ['content']
          //       },
          //       {
          //         model: AnsInVersion,
          //         as: 'answers',
          //         include: [
          //           {
          //             model: Answer,
          //             attributes: ['content']
          //           }
          //         ]
          //       }    
          //     ]
          //   }
          // ]
        }],
        order: [
          ['parts', 'serial_number', 'ASC']
        ]
      }
    )
    return versions;
  }

  getAllVersions = async () => {
    const versions = await Version.findAll({});
    return versions;
  }

  getVersionById = async (id) => {
    // var version = await Version.findOne(where(id));
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
    await Version.destroy(where(id));
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


