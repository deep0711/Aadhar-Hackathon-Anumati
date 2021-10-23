const { Sequelize,sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Pin = sequelize.define("Pin",{
        aadharNumber : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        pinNumber : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    });

    return Pin;
}