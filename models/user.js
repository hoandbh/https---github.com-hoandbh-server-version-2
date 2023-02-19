const { sequelize, DataTypes } = require("./sequelize");

const User = sequelize.define(
    "users",
    {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false
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


