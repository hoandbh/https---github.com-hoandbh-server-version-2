module.exports = (sequelize, DataTypes) => {
    const Tests = sequelize.define(
        "test",
        {
            //not correct, 
            //we need to call this q_in_test
        }

    );
    return Tests;
};