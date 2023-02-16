const { sequelize, DataTypes } = require("./sequelize");
    const Possible_answer = sequelize.define(
        "possible_answers",
        {
            id_ans: {
                type: DataTypes.INTEGER,
                //,allowNull:
                autoIncrement: true,
                primaryKey: true


                //auto increment didn't work
                //i ran this in sql only:
                /*
                ALTER TABLE `try`.`possible_answers` 
                CHANGE COLUMN `id_ans` `id_ans` INT NOT NULL AUTO_INCREMENT ;
                */
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