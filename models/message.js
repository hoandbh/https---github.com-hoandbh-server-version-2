module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        "messages",
        {
        id_message: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING(2000),
        },
        from: {
            type: DataTypes.INTEGER,
        },
        to: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        }
        },
        {
        timestamps: false,
        }
    );
    return Message;
};
    

    