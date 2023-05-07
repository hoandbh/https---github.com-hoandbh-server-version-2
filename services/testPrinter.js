//fonts/Alef-Regular.ttf
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const db = require('../models/index')
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
const { versions } = require('process');



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


const createHeaders = async (version) => {

  const courseName = version.original_questionnaire.course.name;
  const date = version.original_questionnaire.date;
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedDate = dd + '/' + mm + '/' + yyyy;

  const headers = [
    new Paragraph({
      children:
        [
          new ImageRun({
            data: fs.readFileSync('./files/Header.PNG'),
            transformation: {
              width: 600,
              height: 100,
            }
          })
        ]
    }),
    new Paragraph({
      children:
        [
          new TextRun({
            text: `questionnaire in ${courseName}.  Good Luck!!!`
          }),
          new TextRun({
            text: `version: ${version.id}`,
          }),
          new TextRun({
            text: `date: ${formattedDate}`,
          })
        ]
    })
  ]

  return headers;
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
      alignment: AlignmentType.RIGHT 

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
    const headers = await createHeaders(version);
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
    const path = `./files/readyVersions/${courseName}_${year}_v${versionId}.docx`;
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(path, buffer);
    });
    return path;

  }

}

module.exports = new TestPrinter();