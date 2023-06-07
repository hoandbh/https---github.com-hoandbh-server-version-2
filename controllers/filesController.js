const versionDal = require('../dal/versionDal')

class FilesController {

    getVersionsOfQ = async (req, res, next) => {
    try{

        const id = req.params.qId;
        const vDetails = await versionDal.getVersionsByQuestionnaire(id)

        if (!vDetails?.length)
            return res.status(400).json({ message: 'No files found' });

        const paths = [];
        for(let v in vDetails){
            paths.push(vDetails[v].dataValues.pdf_path)
        }
        res.json(paths);
     } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 
}
 
module.exports = new FilesController(); 