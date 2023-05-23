const VersionDal = require('../dal/versionDal')
const db = require('../models/index');
const versionPrinter = require('../services/testPrinter');
const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Ans_in_version = db.ans_in_version;
const QuestionnaireDal = require('../dal/questionnaireDal');
const Part_in_Version = require('../models/part_in_version');
const CreateAnswerKey = require('./createAnswerSheet');


const createShuffledArr = (length) => {
  const arr = Array(length).fill().map((_, i) => i).slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

const createMixedAnswersInVersion = async (answers, versionId, questionId) => {
  const n = createShuffledArr(answers.length);
  for (const [i, answer] of answers.entries()) {
    await Ans_in_version.create({ serial_number: n[i], answer_id: answer.id, version_id: versionId, question_id: questionId });
  }
}   

const createMixedQuestionsInVersion = async (questions, versionId, partId) => {
  const n = createShuffledArr(questions.length);
  var q;
  for (const [i, question] of questions.entries()) {
    q = await Qst_in_version.create({ 'question_id': question.id, 'version_id': versionId, 'serial_number_in_part': n[i], part_id: partId });
    await createMixedAnswersInVersion(question.answers, versionId, q.id);
  };
}

const createQuestionsInVersion = async (questions, versionId, partId) => {
  var q;
  for (const [i, question] of questions.entries()) {
    q = await Qst_in_version.create({ 'question_id': question.id, 'version_id': versionId, 'serial_number_in_part': i, part_id: partId  });
    await createMixedAnswersInVersion(question.answers, versionId, q.id);
  };
}

const createPartsOfVersion = async (parts, versionId) => {
  const n = createShuffledArr(parts.length);
  var p;
  for (const [i, part] of parts.entries()) {
    p = await Part_in_Version.create({ version_id: versionId, part_id: part.id, serial_number: n[i] });
    part.mix ? await createMixedQuestionsInVersion(part.questions, versionId, p.id) : await createQuestionsInVersion(part.questions, versionId, p.id);
  }
}
   
const createVersion = async (questionnaireId, questionnaire) => {
  const version = await Version.create({ 'questionnaire_id': questionnaireId });
  await createPartsOfVersion(questionnaire.parts, version.id);
  return version;
}

const updateFilePathToDb = async (vId, filePath) => {
  await Version.update({ 'pdf_path': filePath },
    {
      where: { id: vId },
    }
  )
}

const findCorrectAnswer = (question) => {
  const answer = question.answers.find(a => a.original_answer.is_correct);
  return answer.serial_number;
}

const createAnswerKey = async (version) => {
  //ANSWER_KEY = {0: 1, 1: 4, 2: 0, 3: 3, 4: 1}
  const dic = {};
  let qst = 0;
  version.parts.forEach(p => {
    p.questions.forEach(q => {
      dic[qst++]=findCorrectAnswer(q);
    })
  })        

  return dic;
}

    
class VersionCreator {

  createVersions = async (id, amount) => {
    const questionnaire = await QuestionnaireDal.getFullQuestionnaire(id)
    let paths = [];
    let ansDic = [];

    for (let i = 1; i <= amount; i++) {
      const version = await createVersion(id, questionnaire);
      const fullVersion = await VersionDal.getFullVersion(version.id);
      const answerKey = await createAnswerKey(fullVersion);
      const versionKey = {
        "vId":version.id,
        "answers":answerKey
      }
      ansDic.push(versionKey);
      CreateAnswerKey.createXL(ansDic);

      const path = await versionPrinter.convertVersionToPdf(version.id);
      await updateFilePathToDb(version.id, path);
      paths.push(path);
    }
    

    return paths;    
  }
  
     
}

const versionCreator = new VersionCreator();
module.exports = versionCreator;
