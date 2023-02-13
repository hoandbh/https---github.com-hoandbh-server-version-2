const { sequelize, DataTypes } = require("./sequelize");
    const Qst_in_questionnaire = sequelize.define(
        "qst_in_questionnaires",
        {
            id_qst: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            questionnaire: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            content: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            pic_path: {
                type: DataTypes.STRING
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
module.exports = Qst_in_questionnaire;
