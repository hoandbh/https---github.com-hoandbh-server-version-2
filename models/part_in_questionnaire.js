const { sequelize, DataTypes } = require("./sequelize");

const Part_in_Questoinnare = sequelize.define(
    "part_in_questionnaire",
    {
        id_part: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        questionnaire:{
            type:DataTypes.INTEGER
        },
        number_in_questionnaire:{
            type:DataTypes.INTEGER
        },
        headline:{
            type:DataTypes.STRING(2000)
        },
        mix:{
            //define whether this part should be mixed or not
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }

    },
    {
        timestamps: false,
    }
)
module.exports=Part_in_Questoinnare;