module.exports = (sequelize, DataTypes) => {
    const Questionnaires = sequelize.define(
        "questionnaire",
        {
            id_questionnaire: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
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
    return Questionnaires;
};
