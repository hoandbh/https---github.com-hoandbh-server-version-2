const db = require('../models/index');
const Part = db.part_in_questionnaire;

class PartDal {
    
  deletePart = async (id) => { 
    await Part.destroy({where:{id}});
  }

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

  changePartName = async (id, headline) => {
    const part = await Part.findByPk(id);
    if (!part){
      return null;
    }
    part.set({headline});
    await part.save();
    return part;
  }

}

const partDal = new PartDal();
module.exports = partDal;