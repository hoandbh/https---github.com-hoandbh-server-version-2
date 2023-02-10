module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define(
        "test",
        {
            //not correct, 
            //we need to call this q_in_test
        }

    );
    return Test;
};