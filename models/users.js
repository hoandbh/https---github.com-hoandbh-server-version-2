module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "users",
        {
            id_user: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            user_name: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            password: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            email: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            permission:{
                type:DataTypes.INTEGER                //,allowNull:
                //,allowNull:
            },
            course:{
                type:DataTypes.INTEGER                //,allowNull:
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
    return Users;
};
