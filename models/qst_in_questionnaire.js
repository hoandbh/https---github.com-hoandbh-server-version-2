const { sequelize, DataTypes } = require("./sequelize");
const Qst_in_questionnaire = sequelize.define(
    "qst_in_questionnaires",
    {
        id_qst: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        ///auto increment didn't work in code
        //i ran it in sql:
        /*   ALTER TABLE `try`.`qst_in_questionnaires` 
           CHANGE COLUMN `id_qst` `id_qst` INT NOT NULL AUTO_INCREMENT ;*/



        questionnaire: {
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
