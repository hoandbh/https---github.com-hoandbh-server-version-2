const QuestionDal = require('../dal/qst_in_questionnaireDal');

class QuestionController {

    getAllQstOfPart = async (req, res) => {
        const partId = req.params.partId;
        const questinos = await QuestionDal.getAllQstOfPart(partId);
        if (!questinos?.length)
            return res.status(204).json({ message: 'No questinos found' });
        res.json(questinos);
    }


    getAllQst = async (req, res) => {
        var questinos = await QuestionDal.getAllQst();
        if (!questinos?.length)
            return res.status(204).json({ message: 'No questinos found' });//למה לא שולח את ההודעה?
        res.json(questinos);
    }

    // getMessageById = async (req, res) => {
    //     const id = req.params.id;
    //     const question = await QstDal.getMessageById(id);
    //     if (question)
    //         res.json(question);
    //     else
    //         res.status(204).json({ message: `Message ID ${id} not found` });
    // }


    createNewQst = async(req,res) => {
        const {content,part_in_questionnaire} = req.body;
        const qst = await QuestionDal.createNewQst({content,part_in_questionnaire});
        if(qst)
            return res.status(201).json(qst)
    }
                
    deleteQst = async (req, res) => { 
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'question ID required' });
        }
        await QuestionDal.deleteQst(id);
        res.json(`Message ID ${id} deleted`);
    }

}

const questionController = new QuestionController();
module.exports = questionController;