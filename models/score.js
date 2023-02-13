const { sequelize, DataTypes } = require("./sequelize");
    const Score = sequelize.define(
        "scores",
        {
            //we need to check how to do PK out of two fields
            student_id: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            }, 
            questionnaire_id: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            score: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
          
        },
        {
            timestamps: false,
        }
    );
module.exports = Score;
