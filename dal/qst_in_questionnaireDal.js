const db = require('../models/index')
const Qst = db.qst_in_questionnaire

class QstInQuestionnaireDal {

    getAllQst = async () => {
        const questions = await Qst.findAll({});
        return questions;
    }

    createNewQst= async (content) => {
        const question = await Qst.create(content);
        return question;
    }

    getAllQstOfPart = async(partId)=>{
        const qsts = await Qst.findAll({
            where:{
                part_in_questionnaire:partId
            }
        })
        return qsts;
    }

    // const fullQuestoinnare = await Questionnaire.findOne(
    //     {
    //         where:{id:id},
    //         attributes:['owner','date'],
    //         include:'questions'
    //     }
    // )

    deleteQst = async (id) => { 
        await Qst.destroy({
            where: {
                id: id
            }
        });
    }

}

const qstInQuestionnaireDal = new QstInQuestionnaireDal();
module.exports  = qstInQuestionnaireDal;