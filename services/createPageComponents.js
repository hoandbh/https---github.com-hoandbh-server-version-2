
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');

class ComponentsCreator {

    createHeaders = async (version) => {

        const courseName = version.original_questionnaire.course.name;
        const date = version.original_questionnaire.date.toLocaleDateString();
      
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
                  text: `date: ${date}`,
                })
              ]
          })
        ]
      
        return headers;
      }

}

module.exports = new ComponentsCreator();