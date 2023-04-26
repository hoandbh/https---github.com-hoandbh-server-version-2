const db = require('../models/index');
const { sequelize } = require('../models/sequelize');
const versionPrinter = require('../services/testPrinter')


const Questionnaire = db.questionnaire;
const Part_In_Questionnaire = db.part_in_questionnaire;
const Qst_from_questionnaire = db.qst_in_questionnaire;
const Possible_Answer = db.possible_answer;
const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Ans_in_version = db.ans_in_version;
const Courses = db.course;
const Owners = db.user;

const getQuestionnaire = async (id) => {
  const fullQuestionnaire = await Questionnaire.findOne(
    {
      where: { id },
      include: [{
        model: Part_In_Questionnaire,
        as: 'parts',
        include: [{
          model: Qst_from_questionnaire,
          as: 'questions',
          include: [{
            model: Possible_Answer,
            as: 'answers'
          }]
        }]
      }]
    }
  )
  return fullQuestionnaire.get({ plain: true });
}

const createAnswersInVersion = (question, versionId) => {
  question.answers.forEach((answer, i) =>
    Ans_in_version.create({ serial_number: i, answer_id: answer.id, version_id: versionId, qst_in_questionnaire: question.id })
  );
}

const createMixedAnswersInVersion = (question, versionId) => {
  const n = createShuffledArr(question.answers.length);
  question.answers.forEach((answer, i) =>
    Ans_in_version.create({ serial_number: n[i], answer_id: answer.id, version_id: versionId, qst_in_questionnaire: question.id })
  );
}

const createShuffledArr = (length) => {
  const arr = Array(length).fill().map((_, i) => i).slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};


const createMixedPartInVersion = (part, versionId) => {
  const n = createShuffledArr(part.questions.length);
  part.questions.forEach((question, i) => {
    Qst_in_version.create({ 'question_id': question.id, 'version_id': versionId, 'serial_number_in_part': n[i] });
    createMixedAnswersInVersion(question, versionId, false);
  });
}

const createPartInVersion = (part, versionId) => {
  part.questions.forEach((question, i) => {
    Qst_in_version.create({ 'question_id': question.id, 'version_id': versionId, 'serial_number_in_part': i });
    createAnswersInVersion(question, versionId);
  });
}

const createPartsOfVersion = (questionnaire, versionId) => {
  questionnaire.parts.forEach(part => {
    part.mix ? createMixedPartInVersion(part, versionId) : createPartInVersion(part, versionId);
  })
}

const createVersion = async (questionnaireId, questionnaire) => {
  const version = await Version.create({ 'questionnaire_id': questionnaireId });
  createPartsOfVersion(questionnaire, version.id);
  return version;
}

const updateFilePathToDb = async (vId, filePath) => {
  await Version.update({ 'pdf_path': filePath },
    {
      where: { id: vId },
    }
  )
}

const isExists = async (model, id) => {
  return await model.findOne({ where: { id } });
}

class VersionCreator {

  createVersions = async (id, amount) => {
    const questionnaire = await getQuestionnaire(id);
    let paths = [];
    for (let i = 1; i <= amount; i++) {
      const version = await createVersion(id, questionnaire);
      const path = await versionPrinter.convertVersionToPdf(version.id);
      await updateFilePathToDb(version.id, path);
      paths.push(path);
    }
    return paths;
  }
}

const versionCreator = new VersionCreator();
module.exports = versionCreator;
