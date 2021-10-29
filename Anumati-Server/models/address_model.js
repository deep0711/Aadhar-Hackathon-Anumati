const { Sequelize,sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Address = sequelize.define("Address",{
        ConsentID : {
            type : DataTypes.UUID,
            allowNull : false,
            validate : {
                notEmpty : true
            },
            unique : true
        },
        GaurdianName : {
            type : DataTypes.STRING
        },
        GaurdianType : {
            type : DataTypes.STRING
        },
        HouseNumber : {
            type : DataTypes.STRING
        },
        StreetName : {
            type : DataTypes.STRING
        },
        Landmark : {
            type : DataTypes.STRING
        },
        Area : {
            type : DataTypes.STRING
        },
        Village : {
            type : DataTypes.STRING
        },
        District : {
            type : DataTypes.STRING
        },
        PostOffice : {
            type : DataTypes.STRING
        },
        State : {
            type : DataTypes.STRING
        },
        PinCode : {
            type : DataTypes.STRING
        },
        Country:{
            type : DataTypes.STRING
        },
        SubDist:{
            type : DataTypes.STRING
        }
    });

    return Address;
}