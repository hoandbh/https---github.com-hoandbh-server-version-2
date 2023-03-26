//V
const { sequelize, DataTypes } = require("./sequelize");

const Course = sequelize.define(
    "courses",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: false
    }
  );

module.exports = Course;

