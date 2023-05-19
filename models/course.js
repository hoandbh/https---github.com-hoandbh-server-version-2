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
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    code: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false
  }
  );

module.exports = Course;

