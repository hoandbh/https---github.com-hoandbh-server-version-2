const path = require('path');
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






// new docx.Paragraph("Parts:"),
// new docx.Paragraph({
//   children: version.parts.map(part => {
//     const questionList = new docx.Paragraph({
//       children: part.questions.map(question => {
//         const answerList = new docx.Paragraph({
//           children: question.answers.map(answer => new docx.Paragraph(answer.original_answer.content))
//         });
//         return new docx.Paragraph({
//           text: question.original_question.content,
//           children: [answerList]
//         });
//       })
//     });
//     return new docx.Paragraph({
//       text: `Part ID: ${part.id} | Headline: ${part.original_part.headline}`,
//       children: [questionList]
//     });
//   })
// })



const createText = (parts) => {
  const arr = []
  parts.forEach(part => {
    arr.push(part.original_part.headline);
    part.questions.forEach(question => {
      arr.push(question.original_question.content);
      question.answers.forEach(answer => {
        arr.push(answer.original_answer.content);
      })
    })
  })
  return arr;
}

const formatParts = (parts) => {

  const arr = parts.map((p) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: `\u202B${p}`,
          bold: true,
          italics: true
        })
      ],
      //alignment: AlignmentType.RIGHT

    })
  })

  return arr;
}

const createContent = async (version) => {
  const parts = createText(version.parts);
  const formatedParts = formatParts(parts);
  return formatedParts;
}



class TestPrinter {

  convertVersionToPdf = async (versionId) => {
    const version = await VersionDal.getFullVersion(versionId);
    // const v = version.get({ plain: true })
    // console.log(v);
    const headers = await printer.createHeaders(version);
    // console.log(headers)
    const content = await createContent(version);
    const paragraphs = headers.concat(content);

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
              children: [new Paragraph("Footer on another page")],
            }),
          },

          children: paragraphs,
        }
      ],
      properties: {
        alignment: AlignmentType.RIGHT //  LEFT JUSTIFIED
      }
    });

    // const doc = new Document({
    //   sections: [
    //     {
    //       properties: {
    //         page: {
    //           pageNumbers: {
    //             start: 1,
    //             formatType: NumberFormat.DECIMAL,
    //           },
    //         },
    //       },
    //       headers: {
    //         default: new Header({
    //           children: [new Paragraph("First Default Header on another page")],
    //         }),
    //       },
    //       footers: {
    //         default: new Footer({
    //           children: [new Paragraph("Footer on another page")],
    //         }),
    //       },
    //       children: paragraphs.map((p) => {
    //         return new Paragraph({
    //           children: p.children,
    //           alignment: AlignmentType.RIGHT // Set the desired alignment for each paragraph
    //         });
    //       })
    //     }
    //   ],
    // });   


    const courseName = version.original_questionnaire.course.name;
    const year = version.original_questionnaire.date.getYear();
    const questionnaireId = version.questionnaire_id;//hadas new
    const filePath = path.join(__dirname, `../public/files/versions/${questionnaireId}/${courseName}_${year}_v${versionId}.docx`); //hadas new
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(filePath, buffer);
    });
    return filePath;

  }

}

module.exports = new TestPrinter();