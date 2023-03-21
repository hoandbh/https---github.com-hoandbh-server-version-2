const { sequelize, DataTypes } = require("./sequelize");
    const Possible_answer = sequelize.define(
        "possible_answers",
        {
            id_ans: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            qst: {
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
            }
        },
        {
            timestamps: false,
        }
    );
module.exports = Possible_answer;