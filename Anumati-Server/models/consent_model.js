const { Sequelize,sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Consent = sequelize.define("Consent",{
        ConsentID : {
            type : DataTypes.UUID,
            defaultValue : Sequelize.UUIDV4(),
            primaryKey: true
        },
        RequesterAadhar : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        ApproverAadhar : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        Status : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        attachment : {
            type : DataTypes.TEXT,
        }

    });

    return Consent;
}