const AnswerDal = require('../dal/answerDal');

class AnswerController {

    getAllAnsOfQst = async (req, res) => {
        const qstId = req.params.qstId;
        const answers = await AnswerDal.getAllAnsOfQst(qstId);
        if (!answers?.length)
            return res.status(204).json({ message: 'No questinos found' });
        res.json(answers);
    }


    createNewAns = async(req,res) => {
        const {content} = req.body;//to get all the feilds
        const answer = await AnswerDal.createNewAns({content});
        if(answer)
            return res.status(201).json(answer);
    }
    
    getAnsById = async (req, res) => {
        const id = req.params.id;
        const pAns = await AnswerDal.getPossibleAnsById(id);
        if (pAns)
            res.json(pAns)
        else
            res.status(204).send();
    }

}

const answerController = new AnswerController();
module.exports = answerController;