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

const sortVersion = (version) => {
  version.parts.sort((p1, p2) => (p1.serial_number - p2.serial_number))
  version.parts.forEach(p => {
    p.questions.sort((q1, q2) => (q1.serial_number_in_part - q2.serial_number_in_part));
    p.questions.forEach(q => {
      q.answers.sort((a1, a2) => (a1.serial_number - a2.serial_number))
    })
  })
}

// const sortVersion = (version) => {
//   version.parts.sort((p1, p2) => {
//     const serialNumber1 = p1.serial_number || 0; // Use 0 as a fallback value for null
//     const serialNumber2 = p2.serial_number || 0;
//     return serialNumber1 - serialNumber2;
//   });

//   version.parts.forEach((p) => {
//     p.questions.sort((q1, q2) => {
//       const serialNumber1 = q1.serial_number_in_part || 0; // Use 0 as a fallback value for null
//       const serialNumber2 = q2.serial_number_in_part || 0;
//       return serialNumber1 - serialNumber2;
//     });

//     p.questions.forEach((q) => {
//       q.answers.sort((a1, a2) => {
//         const serialNumber1 = a1.serial_number || 0; // Use 0 as a fallback value for null
//         const serialNumber2 = a2.serial_number || 0;
//         return serialNumber1 - serialNumber2;
//       });
//     });
//   });
// };

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
                ]
              },
              {
                model: OriginalParts,
                as: 'original_part'
              }
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
        ]
      }
    );
    if(!version)
      return null;
    this._sortVersion(version);
    return version;
  }

  _sortVersion = (version) => {
    version.parts.sort((p1, p2) => (p1.serial_number - p2.serial_number))
    version.parts.forEach(p => {
      p.questions.sort((q1, q2) => (q1.serial_number_in_part - q2.serial_number_in_part));
      p.questions.forEach(q => {
        q.answers.sort((a1, a2) => (a1.serial_number - a2.serial_number))
      })
    })
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


