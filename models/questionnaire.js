const { sequelize, DataTypes } = require("./sequelize");
const Questionnaire = sequelize.define(
    "questionnaire",
    {
        id_questionnaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        owner: {
            type: DataTypes.INTEGER
            //,allowNull:
        },
        date: {
            type: DataTypes.DATE
            //,allowNull:

        }
    },
    {
        timestamps: false,
    }
);
module.exports = Questionnaire;