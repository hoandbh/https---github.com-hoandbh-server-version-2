// Require library
const xl = require('excel4node');
const fs = require('fs')

const Headers = async(dic, ws) =>{
    for(let l in dic){}
}

const questionNumber = async(numOfQsts, ws)=>{
    
    for(let i = 1;i<=numOfQsts;i++){
        const row = i+1;
        ws.cell(row,1).string(`question ${i}`);
    }
}
class CreateAnswerKey {

    createXL = async (ansDic) => {
        console.log(ansDic);
        // Create a new instance of a Workbook class
        var wb = new xl.Workbook();

        // Add Worksheets to the workbook
        var ws = wb.addWorksheet('Sheet 1');

        // Create a reusable style
        var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        });

        const boldStyle = wb.createStyle({
            font:{
                bold:true,
                underline:true
                
            }
        });
        const underlinedStyle = wb.createStyle({
            font:{underline:true}
        });

        ws.cell(1,1).string('Question Number').style(underlinedStyle);
        for(let i = 0;i<ansDic.length;i++){
            const col = i+2;

            const answers = ansDic[i].answers;

            ws.cell(1,col).string(`version ${ansDic[i].vId}`).style(boldStyle);

        }
        await(questionNumber(14,ws));


        wb.writeToBuffer().then((buffer)=>{
            fs.writeFileSync(`./public/files/Excel.xlsx`,buffer);
        });
        wb.write()
    }
}

const createAnswerKey = new CreateAnswerKey();
module.exports = createAnswerKey;