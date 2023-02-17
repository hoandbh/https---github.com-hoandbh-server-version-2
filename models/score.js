//V
const { sequelize, DataTypes } = require("./sequelize");

const Score = sequelize.define(
    "scores",
    {
        id_score: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        questionnaire_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        score_: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

    },
    {
        timestamps: false,
    }
);
module.exports = Score;
