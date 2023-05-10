
const { Header, Document, Packer, Paragraph, TextRun, ImageRun, NumberFormat, Footer, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');

class ComponentsCreator {

  createHeadlines = async (version) => {

    const courseName = version.original_questionnaire.course.name;
    const date = version.original_questionnaire.date;
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedDate = dd + '/' + mm + '/' + yyyy;

    const headlines = [
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
              text: `${courseName}שאלון ב`,
            }),
            new TextRun({
              text: `${version.id}גרסה: `,
              break: 1,

            }),
            new TextRun({
              text: `date: ${formattedDate}`,
              break: 1,

            })
          ]
      })
    ]

    return headlines;
  }




  formatQuestion = (q, questNumber)=>{
    return new Paragraph({
      children:[
        new TextRun({
          text: `${questNumber}שאלה `,
          break:1,
          bold:true
        }),
        // new TextRun({
        //   text:`${q}`
        // })
      ]
    })
  }
  createQuestions = (questions) => {
    let questionCounter = 0;
    const arr = questions.map((q) => {
      questionCounter += 1;
      return this.formatQuestion(q, questionCounter);
    })
    return arr;
    // return new Paragraph({
    //   children:[
    //     new TextRun({
    //       text:'questions[0]'
    //     })
    //   ]

    // })
  }
  formatPart = (part, partNum) => {
    console.log(part);
    const parts =   new Paragraph({
      children: [
        new TextRun({
          text: `${partNum} חלק`,
          break: 1,
          bold: true,
        }),
        this.createQuestions(part.questions),
      ],
    })
    return parts;

  }

  formatParts = async (parts) => {
    let partsCounter = 0;
    const arr = parts.map((p) => {
      partsCounter += 1;
      return this.formatPart(p, partsCounter);
    })

    return arr;
  }

  createContent = async (version) => {

    const parts = version.parts;

    // const parts = await this.createText(version.parts);
    const formatedParts = await this.formatParts(parts);
    return formatedParts;
  }


}

module.exports = new ComponentsCreator();