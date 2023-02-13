const { sequelize, DataTypes } = require("./sequelize");
const Course = sequelize.define("courses", {
    id_course: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    course_name: {
      type: DataTypes.STRING
    },
  },
  {

    timestamps: false,
  });

module.exports = Course;
