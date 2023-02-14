const possibleAnsDal = require("../dal/possibleAnsDal");

class PossibleAnsController {
    //not for sure we need this one
    getAllPossibleAnswers = async (req, res) => {
        const pAnss = await possibleAnsDal.getAllPossibleAns();
        if (!pAnss?.length)
            return res.status(400).json({ message: 'No possible answers found' });
        res.json(pAnss);
    }

    getPossibleAnsById = async (req, res) => {
        const id = req.params.id;
        const pAns = await possibleAnsDal.getPossibleAnsById(id);
        if (pAns)
            res.json(pAns)
        else
            res.status(204).send();
    }

    createPossibleAnswer = async (req, res) => {
        const content = req.body;
        const pAns = possibleAnsDal.createPossibleAns(content);
        if (pAns)
            return res.status(201).json({ message: 'New possible answer created' });
        return res.status(400)
    }

    //TODO: update
    possibleAnsSearch = async (req, res) => {
        //TODO
    }




}


const possibleAnsController = new PossibleAnsController();
module.exports = possibleAnsController;