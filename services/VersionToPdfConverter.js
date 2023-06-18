const fs = require('fs');
const path = require('path');
const VersionDal = require('../dal/versionDal');
const PDFDocument = require('pdfkit');
const {
  toJewishDate,
  toHebrewJewishDate,
} = require('jewish-date')

const hebrewAlphabets = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת',
  'ך', 'ם', 'ן', 'ף', 'ץ'
];

const regularFont = 'fonts/DavidLibre-Regular.ttf';
const boldFont = 'fonts/DavidLibre-Bold.ttf';

const margins = {
  top: 50,
  bottom: 50,
  left: 72,
  right: 72
}

const features = { features: ['rtla'], align: 'right' }

class VersionToPdfConverter {

  generateFilePath = (versionId, version) => {
    const courseName = version.original_questionnaire.course.name;
    const year = version.original_questionnaire.date.getYear();
    const questionnaireId = version.questionnaire_id;
    const filePath = path.join(__dirname, `../public/files/versions/${questionnaireId}/${courseName}_${year}_v${versionId}.pdf`);
    return filePath;
  }

  addFormattedPart = (part, doc) => {
    doc.font(boldFont).text(part.original_part.headline, features);
    doc.moveDown(0.5);
  }

  addFormattedQuestion = (question, questionNumber, doc) => {
    const formattedQuestion = `${questionNumber}.     ${question.original_question.content}`;
    const questionHeight = doc.heightOfString(formattedQuestion, { width: doc.page.width });
    let totalHeight = questionHeight;

    const image = question.original_question.image_path;
    if (image) {
      totalHeight += 220;
    }

    question.answers.forEach((answer) => {
      const formattedAnswer = `     X.${answer.original_answer.content}`;
      const answerHeight = doc.heightOfString(formattedAnswer, { width: doc.page.width });
      totalHeight += answerHeight + 10;
    });

    if (doc.y + totalHeight + 50 > doc.page.height) {
      doc.addPage();
    }



    doc.font(boldFont).text(formattedQuestion, features);
    doc.moveDown(0.5);
    if (image) {
      const pageWidth = doc.page.width;
      const imageWidth = 200; // Adjust the image width as needed
      const x = pageWidth - imageWidth - 50; // Calculate the x-coordinate for right alignment
      const y = 100; // Adjust the y-coordinate as needed
      doc.image(`./public/images/${image}`, x, undefined, { width: imageWidth });
    }
  }

  addFormattedAnswer = (answer, index, doc) => {
    const formattedAnswer = `     ${hebrewAlphabets[index % hebrewAlphabets.length]}.${answer.original_answer.content}`;
    doc.font(regularFont).text(formattedAnswer, features);
    doc.moveDown(0.5);
  }

  writeConent = (version, doc) => {

    let questionNumber = 1;

    version.parts.forEach(part => {
      this.addFormattedPart(part, doc);
      part.questions.forEach(question => {
        this.addFormattedQuestion(question, questionNumber, doc);
        questionNumber++;
        question.answers.forEach((answer, index) => {
          this.addFormattedAnswer(answer, index, doc);
        })
      })
    });

  }


  // one method
  // writeConent = (version, doc) => {

  //   let questionNumber = 1;

  //   version.parts.forEach(part => {
  //     doc.font(boldFont).text(part.original_part.headline, { features: ['rtla'], align: 'right' });

  //     part.questions.forEach(question => {
  //       const formattedQuestion = `${questionNumber}.     ${question.original_question.content}`;
  //       doc.font(regularFont).text(formattedQuestion, { features: ['rtla'], align: 'right' });
  //       doc.moveDown(0.5);
  //       questionNumber++;

  //       question.answers.forEach((answer, index) => {

  //         const formattedAnswer = `     ${hebrewAlphabets[index % hebrewAlphabets.length]}.${answer.original_answer.content}`;
  //         doc.font(regularFont).text(formattedAnswer, { features: ['rtla'], align: 'right' });
  //         doc.moveDown(0.5);
  //       })
  //     })
  //   });

  // }

  writeFirstPage = (version, doc) => {
    doc.image('./public/headers/header.png', 100, 30, { fit: [420, 350], align: 'center' });
    doc.moveDown(6);
  }

  writeFooter = (doc) => {
    const totalPages = doc.bufferedPageRange().count;

    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(i);

      let oldBottomMargin = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      const textWidth = doc.widthOfString(`עמוד ${i + 1} מתוך ${totalPages}`);
      const x = (doc.page.width - textWidth) / 2; // Calculate the X-coordinate for centering
      doc.fillColor('gray').text(
        `עמוד ${i + 1} מתוך ${totalPages}`,
        x,
        doc.page.height - (oldBottomMargin / 2),
        { align: 'left', features: ['rtla'] } // Use 'left' alignment since we manually center the text
      );
      doc.page.margins.bottom = oldBottomMargin;
    }
  }


  writeHeader = (version, doc) => {


    console.log(version)
    const courseName =  version.original_questionnaire.course.name;
    const courseCode =  version.original_questionnaire.course.code;
    const date = version.original_questionnaire.date;
    const term = version.original_questionnaire.term;
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
    const hebrewYear = jewishDateInHebrew.year.slice(1);

    doc.on('pageAdded', () => {
      const a = `שנה"ל ${hebrewYear}, סמסטר א, מועד ${term}`;
      const b = `שאלון בחינה בקורס: ${courseName}`;
      const c = ` מספר קורס: ${courseCode}`;
      const d = ' '
      const lines = [a, b, c, d];
      const headerText = lines.join('\n')
      doc.fillColor('gray').text(headerText, margins.left, margins.top, { align: 'center', features: ['rtla'] });
      doc.fillColor('black');

    });
  }

  convertVersionToPdf = async (versionId) => {

    const version = await VersionDal.getFullVersion(versionId);
    const vSimple = version.get({plain:true})

    const filePath = this.generateFilePath(versionId, version);
    const doc = new PDFDocument({
      bufferPages: true
    });
    doc.pipe(fs.createWriteStream(filePath));

    this.writeFirstPage(version, doc);
    this.writeHeader(vSimple, doc);
    this.writeConent(version, doc);
    this.writeConent(version, doc);
    this.writeConent(version, doc);
    this.writeConent(version, doc);
    this.writeConent(version, doc);

    this.writeFooter(doc);

    doc.end();
    return filePath;

  }

}

module.exports = new VersionToPdfConverter();