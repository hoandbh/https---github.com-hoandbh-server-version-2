
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');
// const  fetch = require('node-fetch')
const axios = require('axios');

const getHebrewDate = async (dd, mm, yy) => {
  try {
    const response = await axios.get(`https://www.hebcal.com/converter?cfg=json&gy=${yy}&gm=${mm}&gd=${dd}&g2h=1&strict=1`);
    return response.data.hebrew;
  } catch (error) {
    console.error(error);
  }
}
const getFormattedDAte = async(date)=>{
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedDate = dd + '/' + mm + '/' + yyyy;
  return formattedDate;

}

class ComponentsCreator {



  createHeaders = async (version) => {

    const courseName = version.original_questionnaire.course.name;
    const date = version.original_questionnaire.date;
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedDate = dd + '/' + mm + '/' + yyyy;
    const hebrewDate = await getHebrewDate(dd, mm, yyyy);

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
            }),
            new TextRun({
              text:` תאריך: ${hebrewDate}`,
            }),
          ]
      })
    ]

    return headers;
  }

  


 createText = (parts) => {
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

 formatParts = (parts) => {

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

 createContent = async (version) => {
  const parts = createText(version.parts);
  const formatedParts = formatParts(parts);
  return formatedParts;
}


}

module.exports = new ComponentsCreator();