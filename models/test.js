const { sequelize, DataTypes } = require("./sequelize");
    const Test = sequelize.define(
        "test",
        {
            //not correct, 
            //we need to call this q_in_test
        }

    );
module.exports =  Test;
