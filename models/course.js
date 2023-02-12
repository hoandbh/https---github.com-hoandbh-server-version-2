module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "courses",
    {
      id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      course_name: {
        type: DataTypes.STRING
      },
    },
    {
      freezeTableName: false,
      timestamps: false      
    }
  );

  return Course;
};
