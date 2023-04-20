const { sequelize, DataTypes } = require("./sequelize");
    const User = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING(200)
            },
            last_name: {
                type: DataTypes.STRING(200)
            },
            password: {
                type: DataTypes.STRING(200)
            },
            email: {
                type: DataTypes.STRING(200)
            },
            //the permission should be enum of 1,2 and 3
            //** the prmission is 1: teacher or 2: admin
            permission:{
                type:DataTypes.INTEGER                
            }, 
        },
        {
            timestamps: false,
        }
    );
module.exports = User;