const { sequelize, DataTypes } = require("./sequelize");
const Ans_selected_in_test = sequelize.define(
    "ans_selected_in_test",
    {

        //we might need ID here because PK doesn't work!


        // id_ans: {
        //     type: DataTypes.INTEGER,
        //     //,allowNull:
        //     autoIncrement: true,
        //     primaryKey: true
        //     
        // },
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        qst_in_questionnaire: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ans_selected: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
    }

);
module.exports = Ans_selected_in_test;
