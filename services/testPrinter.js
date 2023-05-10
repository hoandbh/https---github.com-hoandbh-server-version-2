//fonts/Alef-Regular.ttf
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const db = require('../models/index')
const fs = require('fs');
const printer = require('./createPageComponents')

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
const { versions } = require('process');
const { log } = require('console');



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




class TestPrinter {

  convertVersionToPdf = async (versionId) => {
    const version = await VersionDal.getFullVersion(versionId);
    const v = version.get({ plain: true });

    const headlines = await printer.createHeadlines(version);
    // console.log(headlines)
    const content = await printer.createContent(v);
    const paragraphs = headlines.concat(content);

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              pageNumbers: {
                start: 1,
                formatType: NumberFormat.DECIMAL,
              },
            },
          },
          headers: {
            default: new Header({
              children: [new Paragraph("First Default Header on another page")],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "       איגוד הסמינרים",
                    }
                    ),

                    new TextRun({
                      children: ["page: ", PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [" of ", PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            })
          },

          children: paragraphs,
        }
      ],
      properties: {
        alignment: AlignmentType.RIGHT //  LEFT JUSTIFIED
      }
    });



    const courseName = version.original_questionnaire.course.name;
    const year = version.original_questionnaire.date.getYear();
    const path = `./files/readyVersions/${courseName}_${year}_v${versionId}.docx`;
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(path, buffer);
    });
    return path;

  }

}

module.exports = new TestPrinter();