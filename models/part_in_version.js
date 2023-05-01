const { sequelize, DataTypes } = require("./sequelize");

const Part_in_Version = sequelize.define(
  "part_in_version",
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    version_id:{
      type:DataTypes.INTEGER
    },
    part_id:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    serial_number:{
      type:DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
  }
)
module.exports = Part_in_Version;