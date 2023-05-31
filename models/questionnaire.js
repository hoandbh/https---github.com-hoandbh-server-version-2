const { INTEGER } = require("sequelize");
const { sequelize, DataTypes } = require("./sequelize");
const Questionnaire = sequelize.define(
  "questionnaire",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    owner: {
      type: DataTypes.INTEGER
    },   
    date: {
      type: DataTypes.DATE
    },
    course_id:{  
      type:DataTypes.INTEGER        
    },
    name: {
      type: DataTypes.STRING
    },
    term: { 
      type: DataTypes.ENUM('A','B','C','D','E'),
      defaultValue:'A'
    },
    mixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    // one_part: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  },
  {
    timestamps: false,
  });  
module.exports = Questionnaire;    

