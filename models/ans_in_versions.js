module.exports = (sequelize, DataTypes) => {
    const Ans_in_versions = sequelize.define(
        "ans_in_versions",
        {//check if the PK is from two fields
            qst_in_version_id: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            serial_number: {
                type: DataTypes.INTEGER
                //,allowNull:
                //primaryKey:true
            },
            original_ans: {
                type: DataTypes.INTEGER
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
    return Ans_in_versions;
};
