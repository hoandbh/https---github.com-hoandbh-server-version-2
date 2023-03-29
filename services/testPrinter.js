const PDFDocument = require('pdfkit');
const fs = require('fs');

const db = require('../models/index');
const { KeyObject } = require('crypto');

const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Qst_from_questionnaire = db.qst_in_questionnaire;
// const Ans_in_version = db.ans_in_version;


class TestPrinter {


    convertVersionToPdf = async (versionId, filePath) => {

        const fullVersion = await Version.findOne(
            {
                where: { id: versionId },
                include: [{
                    model: Qst_in_version,
                    as: 'questions_in_version',
                    include:[{
                        model:Qst_from_questionnaire,
                        as: 'question_version'
                    }]

                }]
            }
        )
        const questionsInVersion = fullVersion.dataValues.questions_in_version
        const qIv = [];
        for (let i in questionsInVersion) {
            qIv.push(questionsInVersion[i].dataValues);
        }
        console.log(qIv);
        const sortedQIV = qIv.sort((a, b) => (a.serial_number > b.serial_number)? 1:-1)
        console.log(sortedQIV);
        console.log("here \n\n\n\n\n\n")

        for(let i in sortedQIV){

            Qst_from_questionnaire.findByPk(sortedQIV[i])

        }



        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`./files/${versionId}.pdf`, 'utf8'));
        doc.text(`version: ${versionId}`);
        doc.text(fullVersion);
        doc.end();
        return fullVersion;

        // id:  questionnaire_id:     pdf_path: 
    }

    //return url to pdf!!!

}
module.exports = new TestPrinter();

// const fullQuestoinnare = await Questionnaire.findOne(
//     {
//         where:{id:id},
//         // attributes:['owner','date'],
//           include:[{
//             model:PartInQuestionnaire,
//             as: 'parts_in_questionnaire',
//             // attributes:['id','questionnaire','number_in_questionnaire','headline'],
//             include:[{
//                 model:QuestionsInQuestionnaire,
//                 as: 'questions_in_part'//,
//                 // include:[{
//                 //     model:AnswersForQuestion,
//                 //     as:'qst_in_questionnaire_id'
//                 // }]
//             }]
//           }]

//     }
// )
// return fullQuestoinnare;
