//V
const { sequelize, DataTypes } = require("./sequelize");

const Message = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(2000),
      defaultValue: ""
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isCommited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    timestamps: false,
  });
module.exports = Message;


