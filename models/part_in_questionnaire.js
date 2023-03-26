const { sequelize, DataTypes } = require("./sequelize");

const Part_in_Questoinnare = sequelize.define(
    "part_in_questionnaire",
    {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        questionnaire:{
            type:DataTypes.INTEGER
        },
        serial_number:{
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