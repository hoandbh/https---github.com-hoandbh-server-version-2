const partDal = require('../dal/partDal');
const PartDal = require('../dal/partDal')

class PartController {

  getAllParts = async (req, res, next) => {
    try {
      const parts = await PartDal.getAllParts();
      if (!parts?.length)
        return res.status(400).json({ message: 'no parts found' })
      res.json(parts)
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getPartById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const part = await PartDal.getPartById(id);
      if (part?.length)
        res.json(part)
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getAllPartsForQuestionnaire = async (req, res, next) => {
    try {
      const { questionnaireId } = req.params;
      if (!questionnaireId) {
        return;
      }
      const parts = await PartDal.getAllPartsForQuestionnaire(questionnaireId);
      if (parts?.length)
        res.json(parts);
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  createPartForQuestionnaire = async (req, res, next) => {
    try {
      //to get the part number form the user????
      const questionnaireId = req.params.questionnaireId;
      const { serial_number, headline, mix } = req.body;
      if ((!serial_number && serial_number != 0) || (!headline && typeof (headline) != 'string') || (!mix && mix != false))//mix is boolean!!!
        return res.status(400).json({ message: 'All fields are required' });
      const part = await partDal.createNewPart({ serial_number, headline, mix, questionnaire_id: questionnaireId });
      if (part)
        return res.status(201).json(part);
      return res.status(500).json({ message: 'Failed to create new message' });
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  deletePart = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Message ID required' });
      }
      //to check if part exist
      await PartDal.deletePart(id);
      res.json(`Message ID ${id} deleted`);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  renamePart = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { headline } = req.body;
      const part = await PartDal.renamePart(id, headline);
      return part == null ? res.status(400).send() : res.json(part);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

}

module.exports = new PartController();  
