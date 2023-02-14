const { sequelize, DataTypes } = require("./sequelize");
const Ans_in_version = sequelize.define("ans_in_versions",
    {
        qst_in_version_id: {
            type: DataTypes.INTEGER,
            //,allowNull:
            //autoIncrement: true,
            primaryKey: true
        },
        serial_number: {
            type: DataTypes.INTEGER
            //,allowNull:
            //primaryKey:true
        },
        original_ans: {
            type: DataTypes.INTEGER
            //,allowNull:
        }
    },
    {
        timestamps: false,
    });

module.exports = Ans_in_version;


