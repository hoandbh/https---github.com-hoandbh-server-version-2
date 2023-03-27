const QuestionDal = require('../dal/qst_in_questionnaireDal');

class QuestionController {

    getAllQstOfPart = async (req, res) => {
        const {partId} = req.params;
        const questinos = await QuestionDal.getAllQstOfPart(partId);
        if (!questinos?.length){
            return res.status(204).send();
        }

        res.json(questinos);
    }

    // not in use
    // getAllQstOfPartWithOutAnswers = async (req, res) => {
    //     const {partId} = req.params;
    //     const questinos = await QuestionDal.getAllQstOfPart(partId);
    //     if (!questinos?.length)
    //         return res.status(204).send();
    //     res.json(questinos);
    // }

    updateQst = async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const question = await QuestionDal.updateQst(id,content);
        if (!question) {
            return res.status(404).send('Question not found');
        }
        return res.send(question);
    }   

    // not in use
    // getAllQst = async (req, res) => {
    //     var questinos = await QuestionDal.getAllQst();
    //     if (!questinos?.length)
    //         return res.status(204).send();
    //     res.json(questinos);
    // }

    // not in use
    // getMessageById = async (req, res) => {
    //     const id = req.params.id;
    //     const question = await QstDal.getMessageById(id);
    //     if (question)
    //         res.json(question);
    //     else
    //         return res.status(204).send();
    // }


    createNewQst = async (req, res) => {
        const { content, part_id } = req.body;
        const qst = await QuestionDal.createNewQst({ content, part_id });
        if (qst)
            return res.status(201).json(qst)
    }

    deleteQst = async (req, res) => {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: 'question ID required' });
        }
        await QuestionDal.deleteQst(id);
        res.json(`Message ID ${id} deleted`);
    }

}

const questionController = new QuestionController();
module.exports = questionController;