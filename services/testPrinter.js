//fonts/Alef-Regular.ttf
const { Document, Packer, Paragraph, TextRun, ImageRun } = require('docx');
const db = require('../models/index')
//const PDFDocument = require('pdfkit');
const fs = require('fs');

const Questionnaire = db.questionnaire;
const Part_In_Questionnaire = db.part_in_questionnaire;
const Qst_from_questionnaire = db.qst_in_questionnaire;
const Possible_Answer = db.possible_answer;
const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Ans_in_version = db.ans_in_version;
const Course = db.course;
const Owners = db.user;
const QuestionnaireDal = require('../dal/questionnaireDal');
const VersionDal = require('../dal/versionDal');



const getSerialNumberOfAnswer = async (answer, versionId) => {
  try {
    const aInVersion = await Ans_in_version.findOne({
      where: {
        version_id: versionId,
        answer_id: answer.id
      }
    });
    return aInVersion.get({ plain: true }).serial_number;

  } catch (error) {
    console.log(`Caught Error - no matching answer in version: \n ${error}`);
    const message = `missing answer in version: \n answer: ${answer}, version: ${versionId}`;
    try {
      fs.appendFile('../logs/mqiv.txt', message);

    } catch (error) {
      console.log("didn't write to file");
      console.log(message);

    }
  }
}

const orderAnswersForVersion = async (question, versionId) => {
  for (let i in question.answers) {
    const serialNumberOfAns = await getSerialNumberOfAnswer(question.answers[i], versionId);
    question.answers[i].serial_number = serialNumberOfAns;
  }
  return question.answers.sort((a, b) => (a.serial_number > b.serial_number) ? 1 : -1);
}

const getSerialNumberOfQuestion = async (question, versionId) => {
  try {
    const qInVersion = await Qst_in_version.findOne({
      where: {
        version_id: versionId,
        question_id: question.id
      }
    });
    return qInVersion.get({ plain: true }).serial_number_in_part;
  } catch (error) {
    console.log(`Caught Error - no matching question in versoin: \n ${error}`);
    const message = `missing question in version: \n question: ${question}, version: ${versionId}`;
    try {
      fs.appendFile('../logs/mqiv.txt', message);

    } catch (error) {
      console.log("didn't write to file");
      console.log(message);
    }
  }
}


const getAllQuestionsOfPartInVersionOrder = async (part, versionId) => {
  const questionsArr = part.questions;
  for (let i in questionsArr) {
    const serialNumOfQ = await getSerialNumberOfQuestion(questionsArr[i], versionId);
    questionsArr[i]['serial_number'] = serialNumOfQ;
    questionsArr[i].answers = await orderAnswersForVersion(questionsArr[i], versionId);
  }
  return questionsArr.sort((a, b) => (a.serial_number > b.serial_number) ? 1 : -1);
}


const getAllPartsWithQuestionsInOrder = async (questionnaire, versionId) => {
  for (let i in questionnaire.parts) {
    const m = await getAllQuestionsOfPartInVersionOrder(questionnaire.parts[i], versionId);
    questionnaire.parts[i].questions = m;
  }
  return questionnaire;
}


const createHeaders = async (courseName, versionNumbern, date) => {

  //doc.image('./files/Header.PNG', 100, 30, { fit: [420, 350], align: 'center' }).stroke();
  return new Paragraph({
      children: [new ImageRun({
        data: fs.readFileSync('./files/Header.PNG'),
        transformation: {
          width: 600,
          height: 100,
        }
      })]
    }),
    new Paragraph({
      children: [new TextRun({
        text: `\n\n\n\n\n\n questionnaire in ${courseName}. \n Good Luck!!!`,
      }),
      new TextRun({
        text: `version: ${versionNumbern}`,
      }),
      new TextRun({
        text: `date: ${date}`,
      })]
    })
  
}

const getParts = async (parts) => {
  const arr = []
  parts.forEach(part => {
    arr.push(`\nPart ${part.serial_number}, ${part.headline}\n`);
    arr.push('');

    part.questions.forEach(question => {
      arr.push(`\nQuestion ${question.serial_number}`);
      arr.push(question.content);

      question.answers.forEach(answer => {
        arr.push(`\n ${answer.serial_number}: ${answer.content}`)
      })

    })

  })

  const p = new Paragraph({
    children: 
      arr.map((t) => {return new TextRun({text: t})})
  });
  return p;
}


class TestPrinter {

  convertVersionToPdf = async (versionId, questionnaireId) => {

    const questoinnaire = await QuestionnaireDal.getFullQuestionnaireById(questionnaireId);
    const courseName = questoinnaire.course.name;
    const year = questoinnaire.date.getFullYear();
    const version = VersionDal.getFullVersion(versionId);
    await getAllPartsWithQuestionsInOrder(questoinnaire, versionId);
    const headers = await createHeaders(courseName,versionId,questoinnaire.date.toLocaleDateString());
    const content = await getParts(questoinnaire.parts);
    const doc = new Document({   
      sections: [
        {
          properties: {},
          children: [headers,content],
        },
      ],
    });

    const path = `./files/readyVersions/${courseName}_${year}_v${versionId}.docx`;
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(path, buffer);
    });
    return path;
  }

}   

const testPrinter = new TestPrinter();
module.exports = testPrinter;