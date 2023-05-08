
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');

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
          ], 
          properties: {
            alignment: AlignmentType.RIGHT //  LEFT JUSTIFIED
          }
      })
    ]

    return headers;
  }

}

module.exports = new ComponentsCreator();