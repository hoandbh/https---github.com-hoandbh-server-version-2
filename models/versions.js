module.exports = (sequelize, DataTypes) => {
    const Versions = sequelize.define(
        "versions",
        {
            id_version: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            questionnaire_id: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            pdf_path: {
                type: DataTypes.STRING
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
    return Versions;
};
