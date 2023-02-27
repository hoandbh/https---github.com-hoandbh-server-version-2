const testDal = require('../dal/testDal');

class TestsService {

    convertAnsSelectedInTestToScore = async ({ studentId, questionnaireId }) => {
    //filter by studentId
    const ansSelctedOfThisStudent = await testDal.getByStudent(studentId);
        //return ansSelctedOfThisStudent;
    //filter by questionnaireId        
    let where = {questionnaireId}
    const ansSelctedOfThisQuestionnaire = await testDal.search(where);
    return ansSelctedOfThisQuestionnaire;
    }
}

module.exports = new TestsService();//to do like this for all expoting