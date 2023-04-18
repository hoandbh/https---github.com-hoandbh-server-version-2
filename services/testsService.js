const testDal = require('../dal/testDal');
const Questionnaire = require('../models/questionnaire');
const AnsSelectedInTest = require('../models/ans_selected_in_test');
const PossibleAnswer = require('../models/possible_answer');
const PartInQuestionnaire = require('../models/part_in_questionnaire');
const QstInQuestionnaires = require('../models/qst_in_questionnaire');
const Score = require('../models/score');

const { sequelize } = require('../models/sequelize');

// const Student = require('../models/student');

class TestsService {


    convertAnsSelectedInTestToScore = async ({ studentId, questionnaireId }) => {
        const { ans_selected_in_test, qst_in_questionnaires, possible_answers, scores } = sequelize.models;

        const result = await sequelize.query(
          `
          SELECT 
            COUNT(*) AS correct_answers_count
          FROM 
            ans_selected_in_tests ast
            JOIN qst_in_questionnaires qiq ON qiq.id = ast.qst_in_questionnaire
            JOIN possible_answers pa ON pa.id = ast.answer_id AND pa.qst = qiq.id
            JOIN scores s ON s.questionnaire = qiq.questionnaire_id AND s.student_id = :studentId
          WHERE 
            qiq.questionnaire_id = :questionnaireId AND pa.is_correct = 1
          `,   
          {
            replacements: {
              studentId,
              questionnaireId,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        const correctAnswersCount = result[0].correct_answers_count;
        const score = await scores.create({
            student_id: studentId,
            questionnaire_id: questionnaireId,
            score: correctAnswersCount,
        });
        
        return score;
        // my code!!
        // //filter by studentId
        // const ansSelctedOfThisStudent = await testDal.getByStudent(studentId);
        // //return ansSelctedOfThisStudent;
        // //filter by questionnaireId        
        // let where = { questionnaireId }
        // const ansSelctedOfThisQuestionnaire = await testDal.search(where);
        // return ansSelctedOfThisQuestionnaire;
    }
}

module.exports = new TestsService();//to do like this for all expoting