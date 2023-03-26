const { sequelize, DataTypes } = require("./sequelize");
const Ans_selected_in_test = sequelize.define(
    "ans_selected_in_test",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.INTEGER   
        },
        qst_in_questionnaire: {
            type: DataTypes.INTEGER
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
