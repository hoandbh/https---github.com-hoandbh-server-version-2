//V
const { Op } = require('sequelize');
const { ans_selected_in_test: Test } = require('../models');
const Questionnaire = require('../models/questionnaire');

class TestDal {

    getByStudent = async (studentId) => {
        const ansOfStudent = await Test.findAll({
            where: { student_id: studentId }
        });
        return ansOfStudent;
    }

    search = async (where) => {
        const result = await Test.findAll({
            attributes:['student_id', 'qst_in_questionnaire', 'answer_id'],
            include: [
              { model: Questionnaire, as: 'questionnaire', attributes: ['id'] },
            ],
            where: {
              where//[Op.and]:    
            }
          })
        return result;  

    }
}

const testDal = new TestDal();
module.exports = testDal;