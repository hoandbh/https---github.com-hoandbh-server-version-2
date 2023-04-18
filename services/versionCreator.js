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

const createPartInVersionNotMixed = async (part, versionId) => {
    const questionsInVersionArr = []
    for(let i in part.questions_in_part){
        const q = part.questions_in_part[i];
        const question = await Qst_in_version.create({ 'question_id': q.id, 'version_id': versionId, 'serial_number_in_part': q.serial_number_in_part })
        const qst = question.get({ plain: true });
        questionsInVersionArr.push(qst);
    }
    return questionsInVersionArr ;
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
    const numbers = Array(l).fill().map((_, i) => i+1);
    const n = getShuffledArr(numbers);
    for(let i in part.questions_in_part){
        const q = part.questions_in_part[i];
        const question = await Qst_in_version.create({ 'question_id': q.id, 'version_id': versionId, 'serial_number_in_part': n[i] })
        const qst = question.get({ plain: true });
        questionsInVersionArr.push(qst);
    }
    return questionsInVersionArr ;
}

class VersionCreator {

    createVersions = async (questionnaireId, amount) => {
        const fullQ = await getFullQuestionnaire(questionnaireId);
        //only if managed to get we will precede to create version...
        //need to produce the right errors over her if qstnr doesn't 
        // console.log(fullQ.parts_in_questionnaire[0].questions_in_part[0])
        const v = await createOneVersion(questionnaireId, 'hihihi');
        const qInVersion = await createMixedPartInVersion(fullQ.parts_in_questionnaire[0], v.id)
        console.log(qInVersion);

        return fullQ;
    }



<<<<<<< HEAD
                
                }]
            }
        )

        


    } 
=======
>>>>>>> d05edf291d1cf90558afb370374a4182b9d2c605
}


const versionCreator = new VersionCreator();
module.exports = versionCreator;