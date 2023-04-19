const { sequelize, DataTypes } = require("./sequelize");
const Questionnaire = sequelize.define(
    "questionnaire",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER
            //forign key to user!!
        },
        date: {
            type: DataTypes.DATE
        },

        course_id:{    
            type:DataTypes.INTEGER                
        }   
        //isComplete: {
        //
        //       
        //}

        // term: { 
        //     type: DataTypes.ENUM('A','B','C','D','E')
        //     ,defaultValue:'A'
        // }

    },
    {
        timestamps: false,
    });
module.exports = Questionnaire;

