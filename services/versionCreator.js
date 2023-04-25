const db = require('../models/index');
const { sequelize } = require('../models/sequelize');
const versionPrinter = require('../services/testPrinter')


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
const createVersionDetails = async (questionnaireId) => {
    const version = await Version.create({ 'questionnaire_id': questionnaireId });
    return version.get({ plain: true });
}

const createPartInVersionNotMixed = async (part, versionId) => {
    const questionsInVersionArr = []
    for (let i in part.questions_in_part) {
        const q = part.questions_in_part[i];
        const question = await Qst_in_version.create({ 'question_id': q.id, 'version_id': versionId, 'serial_number_in_part': q.serial_number_in_part })
        const qst = question.get({ plain: true });
        questionsInVersionArr.push(qst);
    }
    return questionsInVersionArr;
}
const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};
const createMixedPartInVersion = async (part, versionId) => {
    const questionsInVersionArr = []
    const l = part.questions_in_part.length;
    const numbers = Array(l).fill().map((_, i) => i + 1);
    const n = getShuffledArr(numbers);
    for (let i in part.questions_in_part) {
        const q = part.questions_in_part[i];
        const question = await Qst_in_version.create({ 'question_id': q.id, 'version_id': versionId, 'serial_number_in_part': n[i] })
        const qst = question.get({ plain: true });
        questionsInVersionArr.push(qst);
    }
    return questionsInVersionArr;
}

const createPartsOfVersion = async (fullQ, versionId) => {

    for (let i in fullQ.parts_in_questionnaire) {
        if (fullQ.parts_in_questionnaire[i].mix) {
            // const questionsInPart = 
            await createMixedPartInVersion(fullQ.parts_in_questionnaire[i], versionId);
            // fullQ.parts_in_questionnaire[i].questions_in_part = questionsInPart;
        }
        else {
            // const questionsInPart = 
            await createPartInVersionNotMixed(fullQ.parts_in_questionnaire[i], versionId);
            // fullQ.parts_in_questionnaire[i].questions_in_part = questionsInPart;
        }

    }
}

const createOneVersion = async (questionnaireId, fullQ) => {
    const v = await createVersionDetails(questionnaireId, 'hihihi');
    await createPartsOfVersion(fullQ, v.id);

    return v;
}
const updateFilePathToDb = async (vId, filePath) => {
    await Version.update({ 'pdf_path': filePath },
        {
            where: { id: vId },
        }
    )
}
  
class VersionCreator {

    createVersions = async (questionnaireId, amount) => {
        const fullQ = await getFullQuestionnaire(questionnaireId);
        if (!fullQ) //|| !is_exist.active //if field activ is exist
            return res.status(401).json({ message: 'No questionnaire found' });

        let paths = [];
        for (let i = 0; i < amount; i++) {
            const v = await createOneVersion(questionnaireId, fullQ);
            const path = await versionPrinter.convertVersionToPdf(v.id);
            await updateFilePathToDb(v.id, path);
            paths.push(path);
        }
       

    }



}


const versionCreator = new VersionCreator();
module.exports = versionCreator;