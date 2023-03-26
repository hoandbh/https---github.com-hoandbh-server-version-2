const { sequelize, DataTypes } = require("./sequelize");
const Qst_in_questionnaire = sequelize.define(
    "qst_in_questionnaires",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        part_in_questionnaire: {
            type: DataTypes.INTEGER
            //,allowNull:
        },
        content: {
            type: DataTypes.STRING(1000)
            //,allowNull:
        },
        pic_path: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false,
    }
);

module.exports = Qst_in_questionnaire;
