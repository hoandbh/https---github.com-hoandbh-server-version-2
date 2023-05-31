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

  _sortParts = (parts) => {
    parts.sort((p1, p2) => (p1.serial_number - p2.serial_number));
  }

  getAllPartsForQuestionnaire = async (questionnaireId) => {
    const parts = await Part.findAll({
      where:{
        questionnaire_id:questionnaireId
      }
    })
    this._sortParts(parts);
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
     
  renamePart = async (id, headline) => {
    const part = await Part.findByPk(id);
    if (!part){
      return null;
    }
    await part.set({headline});
    await part.save();
    return part;
  }

}

module.exports = new PartDal();