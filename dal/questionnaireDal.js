const db = require('../models/index');
const Questionnaire = db.questionnaire


class QuestionnaireDal {

    getAllQuestionnaires = async() =>{
        const quests = await Questionnaire.findAll({});
        return quests;
    }
  
    getQuestionnaireById = async(id)=>{
        var quest = await Questionnaire.findOne({
            where :{
                id_questionnaire: id
            }
        })
        return quest;
    }
    //add more functions for getting according to certain paramters
    createNewQuestionnaire = async(content)=>{
        const quest = await Questionnaire.create(content);
        return quest;
    }
    deleteQuestionnaire = async(id)=>{
        await Questionnaire.destroy({
            where: {
                id_questionnaire: id
            }
        })
    }

    //TODO updateQuestionnaire = async()=>
}


const questionnaireDal = new QuestionnaireDal();
module.exports = questionnaireDal;