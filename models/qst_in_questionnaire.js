module.exports = (sequelize, DataTypes) => {
    const Qst_in_questionnaire = sequelize.define(
        "qst_in_questionnaire",
        {
            id_qst: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            questionnaire: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            content: {
                type: DataTypes.STRING(1000)
                //,allowNull:
            },
            pic_path: {
                type: DataTypes.STRING
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
    return Qst_in_questionnaire;
};
