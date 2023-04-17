//content
//if int needed - int
//

const versionCreator = require('../services/versionCreator')
const questionnaireDal = require("../dal/questionnaireDal");

class QuestionnaireController {

    //localhost:3600/api/messages

    getAllQuestionnaires = async (req, res) => {
        const questionnaires = await questionnaireDal.getAllQuestionnaires();
        if (!questionnaires?.length)
            return res.status(400).json({ message: 'No questionnaires found' })
        res.json(questionnaires)

    }
    getQuestionnaireById = async (req, res) => {

        //this function really brings all the questions that belong to this questionnaire 
        const id = req.params.id;
        const questionnaire = await questionnaireDal.getQuestionnaireById(id);
        if (questionnaire)
            res.json(questionnaire)
        else
            res.status(204).send();
    }

    getFullQuestionnaire = async (req, res) => {
        const id = req.params.id;
        const fullQuestionnaire = await questionnaireDal.getFullQuestionnaireById(id);
        if (fullQuestionnaire)
            return res.json(fullQuestionnaire)
        else
            res.status(204).send()

    }
    createQuestionnaire = async (req, res) => {
        const content = req.body;
        const questionnaire = await questionnaireDal.createNewQuestionnaire(content);
        if (questionnaire)
            return res.status(201).json(questionnaire)

    }
    deleteQuestionnaire = async (req, res) => {
        const id = req.params.id;
        //the way I think: 
        qstnr = this.getQuestionnaireById(id);
        if (!qstnr)
            return res.status(400).json({ message: 'no questionnaire with this ID' });
        else
            await questionnaireDal.deleteQuestionnaire(id);
        res.json(`Questionnaire with ID ${id} was deleted`);
        //what we did in msg controller
        // if (!id) {
        //     return res.status(400).json({ message: 'questionnaire id required' });
        // } 
        // await questionnaireDal.deleteQuestionnaire(id);


    }
    getQuestionnairesByOwner = async (req,res)=>{
        const owner = req.params.ownerId;
        var qstnr = await questionnaireDal.getQuestionnairesByOwner(owner);
        if (qstnr)
            res.json(qstnr);
        else
            res.status(204).send();
        
    }
    createVersionForQuestionnaire = async(req,res)=>{

        const id = req.params.id;
        const amount = req.body.amount;
        const a = await versionCreator.createVersions(id,amount);
        return res.status(200).json({version: "hi, success!!!"});


    }
}

const questionnaireController = new QuestionnaireController();
module.exports = questionnaireController;