// Require library
const xl = require('excel4node');
const fs = require('fs')
const path = require('path');

const fillQuestionNumber = async (numOfQsts, ws, style) => {

    for (let i = 1; i <= numOfQsts; i++) {
        const row = i + 1;
        ws.cell(row, 1).number(i).style(style);
    }
}

const fillOneversion = async (vAnswers, rowN, ws, style1, style2) => {
    ws.cell(1, rowN).string(`version ${vAnswers.vId}`).style(style1);
    const ans = vAnswers.answers;
    const keys = Object.keys(ans);
    for (let i = 0; i < keys.length; i++) {
        const value = ans[keys[i]];
        ws.cell(i + 2, rowN).number(value).style(style2);
        console.log(`Iteration: ${i},  Value: ${value}`);
    }

}

class CreateAnswerKey {

    createXL = async (ansDic) => {

        var wb = new xl.Workbook();

        var ws = wb.addWorksheet('Answers');

        const boldUnderlinedStyle = wb.createStyle({
            font: {
                bold: true,
                underline: true

            }
        });
        const underlinedStyle = wb.createStyle({
            font: { underline: true }
        });
        const boldStyle = wb.createStyle({
            font: {
                bold: true,
            },
            alignment: {
                horizontal: 'center'
            }
        });
        const boldStyleSide = wb.createStyle({
            font: {
                bold: true,
            }
        })

        ws.cell(1, 1).string('Question Number').style(underlinedStyle);

        const numOfQsts = Object.keys(ansDic[0].answers).length;

        await (fillQuestionNumber(numOfQsts, ws, boldStyleSide));

        for (let i = 0; i < ansDic.length; i++) {
            fillOneversion(ansDic[i], i + 2, ws, boldUnderlinedStyle, boldStyle);
        }

        const filePath = path.join(__dirname, `../public/files/answerDics`, 'output.xlsx');
        try {
            fs.accessSync(filePath, fs.constants.W_OK);
            wb.write(filePath);
        } catch (error) {
            console.error(`Error occurred while writing to the file: ${error.message}`);
        }
    }
}

module.exports = new CreateAnswerKey();