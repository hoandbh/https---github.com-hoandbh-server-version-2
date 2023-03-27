const { sequelize, DataTypes } = require("./sequelize");
const Qst_in_questionnaire = sequelize.define(
    "qst_in_questionnaires",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        part_id: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING(1000)
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
