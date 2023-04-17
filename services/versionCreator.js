const db = require('../models/index');
const { sequelize } = require('../models/sequelize');

const Questionnaire = db.questionnaire;
const Part_In_Questionnaire = db.part_in_questionnaire;
const Qst_from_questionnaire = db.qst_in_questionnaire;
const Possible_Answer = db.possible_answer;
const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Ans_in_version = db.ans_in_version;
const Courses = db.course;
const Owners = db.user;


// createVersionsForQuestionnaire = async (questionnaireId, amount) =>{
//     const questionnaireToMix = await Questionnaire.findByPk(questionnaireId){
//     };

// createVersion = async(q_id, pdfPath)=>{
//     const version = await Version.create({'questionnaire':q_id, 'pdf_path':pdfPath});
//     return version;
// }
//     const versionsArr = []
//     for(let i = 0; i<questionnaireId;i++){
//         const version = await Version.create({'questionnaire':q_id, 'pdf_path':'enter pdf path versionCreator'});
//         versionsArr.append(version);
//     }
//     const questionsInQuestionnaire = Questionnaire.findOne(
//         {
//             where:{id_questionnaire: questionnaireId},
//             include:[{
//                 model: QuestionsInQuestionnaire,


//             }]
//         }
//     )
// } 
const getFullQuestionnaire = async (questionnaireId) => {
    const fullQuestionnaire = await Questionnaire.findOne(
        {
            where: { id: questionnaireId },
            include: [{
                model: Part_In_Questionnaire,
                as: 'parts_in_questionnaire',
                include: [{
                    model: Qst_from_questionnaire,
                    as: 'questions_in_part',
                    include: [{
                        model: Possible_Answer,
                        as: 'answers'
                    }]
                }]
            }]
        }
    )
    return fullQuestionnaire.get({ plain: true });
}
const createOneVersion = async (questionnaireId, pdfPath) => {
    const version = await Version.create({ 'questionnaire_id': questionnaireId, 'pdf_path': pdfPath });
    return version.get({ plain: true });
}

class VersionCreator {

    createVersions = async (questionnaireId, amount) => {
        const fullQ = await getFullQuestionnaire(questionnaireId);
        //only if managed to get we will precede to create version...
        //need to produce the right errors over her if qstnr doesn't exist
        const v = await createOneVersion(questionnaireId, 'hihihi');
        console.log(v);

        return fullQ;
    }



}


const versionCreator = new VersionCreator();
module.exports = versionCreator;