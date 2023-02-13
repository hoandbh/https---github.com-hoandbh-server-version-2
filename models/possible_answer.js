const { sequelize, DataTypes } = require("./sequelize");
    const Possible_answer = sequelize.define(
        "possible_answers",
        {
            id_ans: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            qst: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            content: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            pic_path: {
                type: DataTypes.STRING
                //,allowNull:
            },
            is_correct:{
                type:DataTypes.BOOLEAN
            }
        },
        {
            timestamps: false,
        }
    );
module.exports = Possible_answer;