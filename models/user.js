const { sequelize, DataTypes } = require("./sequelize");
    const User = sequelize.define(
        "users",
        {
            id: {
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
            //the permission should be enum of 1,2 and 3
            permission:{
                type:DataTypes.INTEGER                
            },
            course_id:{    
                type:DataTypes.INTEGER                
            }   
        },
        {
            timestamps: false,
        }
    );
module.exports = User;