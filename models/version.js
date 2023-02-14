const { sequelize, DataTypes } = require("./sequelize");
    const Version = sequelize.define(
        "versions",
        {
            id_version: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            questionnaire_id: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            pdf_path: {
                type: DataTypes.STRING
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
module.exports= Version;

