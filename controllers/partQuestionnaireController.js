const PartQDal = require('../dal/partQuestionnaireDal')


class PartInQuestionnaireController {


    getAllParts = async (req, res) => {
        const parts = await PartQDal.getAllParts();
        if (!parts?.length)
            return res.status(400).json({ message: 'no parts found' })
        res.json(parts)
    }

    getPartById = async(req,res)=>{
        const id = req.params.id;
        const part = await PartQDal.getPartById(id);
        if(part)
            res.json(part)
        else
            res.status(204).send();
    }

}
const partInQuestionnaireController = new PartInQuestionnaireController();
module.exports = partInQuestionnaireController;
