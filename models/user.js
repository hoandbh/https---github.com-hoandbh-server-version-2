const { sequelize, DataTypes } = require("./sequelize");

const User = sequelize.define(
    "users",
    {
        id_user: {
            type: DataTypes.INTEGER,
            //,allowNull:
            //autoIncrement: true,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING(1000),
            allowNull:false
        },
        password: {
            type: DataTypes.STRING(1000)
            //,allowNull:
        },
        email: {
            type: DataTypes.STRING(1000)
        },
        permission: {
            type:DataTypes.ENUM('TEACHER', 'COORDINATOR','ADMIN'),
            // allowNull:false,//??
            defaultValue:'TEACHER'
        },
        course: {
            type: DataTypes.INTEGER,
            defaultValue:1
        }
    },
    {
        timestamps: false,
    }//necessary?
);
module.exports = User;


