const { sequelize, DataTypes } = require("./sequelize");
const Ans_in_version = sequelize.define("ans_in_versions",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serial_number: {
            type: DataTypes.INTEGER
        },
        answer_id: {
            type: DataTypes.INTEGER
        },
        version_id:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
    });

module.exports = Ans_in_version;


