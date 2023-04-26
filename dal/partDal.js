const db = require('../models/index');
const Part = db.part_in_questionnaire;

class PartDal {

  createNewPart = async (content) => {
    const part = await Part.create(content)
    return part;
  }

  getAllPartsForQuestionnaire = async (questionnaireId) => {

    const parts = await Part.findAll({
      where:{
        questionnaire_id:questionnaireId
      }
    })
    return parts;
  }

  //not necessary???
  getAllParts = async () => {
    const parts = await Part.findAll({});
    return parts;
  }

  getPartById = async (id) => {
    const part = await Part.findByPk(id)
    return part;
  }
}

const partDal = new PartDal();
module.exports = partDal;