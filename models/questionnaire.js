const { sequelize, DataTypes } = require("./sequelize");
const Questionnaire = sequelize.define(
    "questionnaire",
    {
        id_questionnaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER
            //forign key to user!!
        },
        date: {
            type: DataTypes.DATE
            //,allowNull:

        },
        // term: {
        
        // }

    },
    {
        timestamps: false,
    });
module.exports = Questionnaire;