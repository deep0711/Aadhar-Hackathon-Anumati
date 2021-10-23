const { Sequelize,sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Log = sequelize.define("Log",{
        ConsentID : {
            type : DataTypes.UUID,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        Action : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    });

    return Log;
}