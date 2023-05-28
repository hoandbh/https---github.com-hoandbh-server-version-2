const db = require('../models/index');
const AnsInVersion = db.ans_in_version;

class AnsInVersionDal {

  //maybe we need this for a different controller, like for the questinversion controller 
  getAllAnswersForQuestion = async (qId) => {
    //returns all answers for this question 
    var answersForQuestion = await AnsInVersion.findAll({
      where: {
        id: qId
      }
    })
    return answersForQuestion;
  }   

  createNewAnsInVersion = async (content) => {
    const ans = await AnsInVersion.create(content);
    return ans;
  }

  // updateAnsInVersion = async(content)=>{
  //   const ans = await AnsInVersion.update({})
  // }

  // deleteAnsInVersion = async(id)=>{
  //   await
  // }

}
 
module.exports = new AnsInVersionDal(); 