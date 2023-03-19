const { version } = require('../models/index');
const db = require('../models/index');
const {sequelize} = require('../models/sequelize');


const Questionnaire = db.questionnaire;
const Version = db.version;
const QuestionsInQuestionnaire = db.qst_in_questionnaire
const PartInQuestionnaire = db.part_in_questionnaire
const PossibleAnswers = db.possible_answer

class VersionCreator {
    
    createVersionsForQuestionnaire = async (questionnaireId, amount) =>{

        const questionnaireToMix = await Questionnaire.findByPk(questionnaireId){

        };

        
    createVersion = async(q_id, pdfPath)=>{
        const version = await Version.create({'questionnaire':q_id, 'pdf_path':pdfPath});
        return version;
    }

        const versionsArr = []
        for(let i = 0; i<questionnaireId;i++){
            const version = await Version.create({'questionnaire':q_id, 'pdf_path':'enter pdf path versionCreator'});
            versionsArr.append(version);
        }

        const questionsInQuestionnaire = Questionnaire.findOne(
            {
                where:{id_questionnaire: questionnaireId},
                include:[{
                    model: QuestionsInQuestionnaire,

                
                }]
            }
        )

        


    } 
}


const versionCreator = new VersionCreator();
module.exports = versionCreator;