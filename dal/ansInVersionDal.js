const db = require('../models/index');
const AnsInVersion = db.ans_in_version;

class AnsInVersionDal {

    //maybe we need this for a different controller, like for the questinversion controller 
    getAllAnswersForQuestion = async (qId) => {
        //returns all answers for this question 
        var answersForQuestion = await AnsInVersion.findAll({
            where: {
                qst_in_version_id: qId
            }
        })
        return answersForQuestion;

    }

    createNewAnsInVersion = async (content) => {
        const ans = await AnsInVersion.create(content);
        return ans;
    }

    // updateAnsInVersion = async(content)=>{
    //     const ans = await AnsInVersion.update({})
    // }

    // deleteAnsInVersion = async(id)=>{
    //     await
    // }

}


const ansInVersionDal = new AnsInVersionDal();
module.exports = ansInVersionDal;


// qst_in_version_id: {
//     type: DataTypes.INTEGER,
//         //,allowNull:
//         //autoIncrement: true,
//         primaryKey: true
// },
// serial_number: {
//     type: DataTypes.INTEGER
//     //,allowNull:
//     //primaryKey:true
// },
// original_ans: {
//     type: DataTypes.INTEGER
//     //,allowNull:
// }