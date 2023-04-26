const versionDal = require('../dal/versionDal')

class FilesController {

    getVersionsOfQ = async (req, res) => {

        const id = req.params.qId;
        const vDetails = await versionDal.getVersionsByQuestionnaire(id)

        if (!vDetails?.length)
            return res.status(400).json({ message: 'No files found' });

        const paths = [];
        for(let v in vDetails){
            paths.push(vDetails[v].dataValues.pdf_path)
        }
        res.json(paths);
    }
}


const filesController = new FilesController();
module.exports = filesController;