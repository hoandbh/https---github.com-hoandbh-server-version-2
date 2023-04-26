//V
const { sequelize, DataTypes } = require("./sequelize");

  const Version = sequelize.define(
    "versions",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      questionnaire_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      pdf_path: {
        type: DataTypes.STRING,
        defaultValue:null
      }
    },
    {
      timestamps: false,
    }
  );
module.exports= Version;

