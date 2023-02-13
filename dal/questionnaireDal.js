const db = require('../models/index');
const Questionnaire = db.questionnaire


class QuestionnaireDal {

    getAllQuestionnaires = async() =>{
        const quests = await Questionnaire.findAll({});
        return this.getAllQuestionnaires;
    }
}