const db = require('../models/index');
const PartInQuestionnaire = db.part_in_questionnaire;


class PartInQstnrDal {



    //not necessary???
    getAllParts = async()=>{
        const parts = await PartInQuestionnaire.findAll({});
        return parts;
    }

    getPartById = async(id)=>{
        var part = await PartInQuestionnaire.findOne({
            where:{
                id_part:id
            }
        })
        return part;
    }
}

const partInQuestionnaireDal = new PartInQstnrDal();
module.exports = partInQuestionnaireDal;