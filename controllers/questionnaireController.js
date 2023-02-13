const questoinnaireDal = require("../dal/questionnaireDal");

class QuestionnaireController {

    //localhost:3600/api/messages

    getAllQuestionnaires = async(req,res)=>{
        const questionnaires = await questoinnaireDal.getAllQuestionnaires();
        if(!messages?.length)
            return res.status(400).json({message:'No questionnaires found'})
        res.json(questionnaires)
        
    }
    getQuestionnaire = async(req,res)=>{
        const parameters = req.query;
        const questionnaires = await questoinnaireDal.getAllQuestionnaires();
        
    }
}


const questionnaireController = new QuestionnaireController();

module.exports = questionnaireController;