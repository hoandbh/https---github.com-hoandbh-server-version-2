const { sequelize, DataTypes } = require("./sequelize");
<<<<<<< HEAD
    const Questionnaire = sequelize.define(
        "questionnaire",
        {
            id_questionnaire: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            owner: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            date: {
                type: DataTypes.DATE
                //,allowNull:

            }
=======
const Questionnaire = sequelize.define(
    "questionnaire",
    {
        id_questionnaire: {
            type: DataTypes.INTEGER,
            primaryKey: true//,
            //autoIncrement: true,
>>>>>>> 13c9222374e1301103e7597dc0e718a2b024663f
        },
        owner: {
            type: DataTypes.INTEGER
            //,allowNull:
        },
        date: {
            type: DataTypes.DATE
            //,allowNull:

        }
    },
    {
        timestamps: false,
    }
);
module.exports = Questionnaire;