const QstDal = require('../dal/qst_in_questionnaireDal');

class QstInQuestionnaireController {

    getAllQst = async (req, res) => {
        var questinos = await QstDal.getAllQst();
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


    createQstInAnswer = async(req,res)=>{
        const content = req.body;
        const qst = QstDal.createNewQst(content);
        if(qst)
            return res.status(201).json({message:"new question in questionnaire created"})
    }
    deleteQst = async (req, res) => { 
        const id = req.params.id;
        if (!id) {//לעשות את הבדיקה הזו תמיד??
            return res.status(400).json({ message: 'question ID required' });
        }
        await QstDal.deleteQst(id);
        res.json(`Message ID ${id} deleted`);
    }

}

const qstInQuestionnaireController = new QstInQuestionnaireController();
module.exports = qstInQuestionnaireController;