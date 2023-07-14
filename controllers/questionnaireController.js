//content
//if int needed - int
//   

const versionCreator = require('../services/versionCreator')
const questionnaireDal = require("../dal/questionnaireDal");

class QuestionnaireController {

  getOwnerId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const questionnaire = await questionnaireDal.getQuestionnaireById(id);
      return questionnaire?.owner;
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getAllQuestionnaires = async (req, res, next) => {
    try {
      const { owner } = req.query;
      if (owner) {
        const qstnr = await questionnaireDal.getQuestionnairesByOwner(owner);
        if (qstnr.length)
          res.json(qstnr);
        else
          res.status(204).send();
      } else {
        const questionnaires = await questionnaireDal.getAllQuestionnaires(owner);
        if (!questionnaires?.length)
          return res.status(400).json({ message: 'No questionnaires found' })
        res.json(questionnaires)
      }
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getQuestionnaireById = async (req, res, next) => {
    try {
      //this function really brings all the questions that belong to this questionnaire 
      const id = req.params.id;
      const questionnaire = await questionnaireDal.getQuestionnaireById(id);
      if (questionnaire)
        res.json(questionnaire)
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getFullQuestionnaire = async (req, res, next) => {
    try {
      const { id } = req.params;
      const fullQuestionnaire = await questionnaireDal.getFullQuestionnaire(id);
      if (fullQuestionnaire)
        return res.json(fullQuestionnaire);
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  createQuestionnaire = async (req, res, next) => {
    try {
      const { owner, date, course_id, name, term } = req.body;
      if (!owner || !date || !course_id || !name || !term)
        return res.status(400).json({ message: 'All fields are required' });
      const questionnaire = await questionnaireDal.createNewQuestionnaire({ owner, date, course_id, name, term });
      if (questionnaire)
        return res.status(201).json(questionnaire);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  deleteQuestionnaire = async (req, res, next) => {
    try {
      const { id } = req.params;
      const questionnaire = questionnaireDal.getQuestionnaireById(id);
      if (!questionnaire) {
        return res.status(400).json({ message: 'no questionnaire with this ID' });
      }
      await questionnaireDal.deleteQuestionnaire(id);
      res.json(`Questionnaire with ID ${id} was deleted`);
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

  getQuestionnairesByOwner = async (req, res, next) => {
    try {
      const owner = req.params.ownerId;
      const qstnr = await questionnaireDal.getQuestionnairesByOwner(owner);
      if (qstnr)
        res.json(qstnr);
      else
        res.status(204).send();
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }
  
  createVersionForQuestionnaire = async (req, res, next) => {
    // try {
      const { id } = req.params;
      const { amount } = req.body;
      const mixed = await questionnaireDal.isMixed(id);
      if (mixed) {
        return res.status(409).json({ message: 'You mixed this questionnaire already' });
      }
      const versions = await versionCreator.createVersions(id, amount);
      if (!versions) {
        return res.status(500).send();
      }
      //await questionnaireDal.disableMixing(id); // hadas error
      return res.status(201).json(versions);
    // } catch (error) {
    //   throw new Error(error);
    //   next(error);
    // }
  }

}

module.exports = new QuestionnaireController(); 