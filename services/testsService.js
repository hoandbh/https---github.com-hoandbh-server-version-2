const testDal = require('../models/ans_selected_in_test');

class TestsService {
    convertAnsSelectedInTestToScore = async ({ studentId, questionnaireId }) => {
        const ansSelctedOfThisStudent = await testDal.getByStudent(studentId);
        return ansSelctedOfThisStudent;
    }
}

module.exports = new TestsService();