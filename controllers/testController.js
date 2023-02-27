const testsService = require('../services/testsService');

class TestsController {
  convertAnsSelectedInTestToScore = async(req, res) => {
    const {studentId, questionnaireId} = req.body;
    const ansSelctedOfThisStudent = await testsService.convertAnsSelectedInTestToScore({studentId, questionnaireId});
    return ansSelctedOfThisStudent;
  }
}

const testsController = new TestsController();
module.exports = testsController;
