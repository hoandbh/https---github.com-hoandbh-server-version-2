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

    deleteQst = async (id) => { 
        await Qst.destroy({
            where: {
                id_qst: id
            }
        });
    }

}

const qstInQuestionnaireDal = new QstInQuestionnaireDal();
module.exports  = qstInQuestionnaireDal;