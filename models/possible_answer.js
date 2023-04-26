const { sequelize, DataTypes } = require("./sequelize");
  const Possible_answer = sequelize.define(
    "possible_answers",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      question_id: {
        type: DataTypes.INTEGER
      },
      content: {
        type: DataTypes.STRING(1000)
      },    
      pic_path: {   
        type: DataTypes.STRING,
        allowNull:true
      },
      is_correct:{
        type:DataTypes.BOOLEAN
      },
      serial_number: {
        type: DataTypes.INTEGER
      },
    },
    {
      timestamps: false,
    }
  );
module.exports = Possible_answer;