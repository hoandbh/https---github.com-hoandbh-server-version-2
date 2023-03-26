const { model } = require('sequelize');
const { possible_answer } = require('../models/index');
const db = require('../models/index');


const Questionnaire = db.questionnaire
const PartInQuestionnaire = db.part_in_questionnaire
const QuestionsInQuestionnaire = db.qst_in_questionnaire


class QuestionnaireDal {

    

    getAllQuestionnaires = async () => {
        //to add the name of course??
        const quests = await Questionnaire.findAll({});
        return quests;
    }

    getQuestionnaireById = async (id) => {
        var quest = await Questionnaire.findByPk(id);
        return quest;
    }
    
    getQuestionnairesByOwner = async(ow)=>{
        var quest = await Questionnaire.findAll({
            where: {owner:ow}
        });
        return quest;
    
    }


    //add more functions for getting according to certain paramters

    getFullQuestionnaireById = async(id)=>{
        //const quest = this.getQuestionnaireById(id);
        //const questionsInQuestionnaire = 

        const fullQuestoinnare = await Questionnaire.findOne(
            {
                where:{id:id},
                // attributes:['owner','date'],
                 include:[{
                    model:PartInQuestionnaire,
                    as: 'parts_in_questionnaire',
                    // attributes:['id','questionnaire','number_in_questionnaire','headline'],
                    include:[{
                        model:QuestionsInQuestionnaire, 
                        as: 'questions_in_part'
                    }]
                 }]
   
            }   
        )
        return fullQuestoinnare;

    }
    createNewQuestionnaire = async (content) => {
        const quest = await Questionnaire.create(content);
        return quest;
    }
    
    deleteQuestionnaire = async (id) => {
        await Questionnaire.destroy({
            where: {
                id: id
            }
        })
    }

    //TODO updateQuestionnaire = async()=>
}


const questionnaireDal = new QuestionnaireDal();
module.exports = questionnaireDal;