//V
const { Op } = require('sequelize');
const { ans_selected_in_test: Test } = require('../models');

class TestDal {

    getByStudent = async (studentId) => {
        const ansOfStudent = await Test.findAll({ 
            where: { student_id: studentId } 
        });
        return ansOfStudent;
    }
}

const testDal = new TestDal();
module.exports = testDal;