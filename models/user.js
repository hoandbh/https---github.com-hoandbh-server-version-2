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
                type: DataTypes.STRING(200)
            },
            password: {
                type: DataTypes.STRING(200)
            },
            email: {
                type: DataTypes.STRING(200)
            },
            permission:{
                type:DataTypes.INTEGER                
            },
            course:{    
                type:DataTypes.INTEGER                
            }   
        },
        {
            timestamps: false,
        }
    );
module.exports = User;