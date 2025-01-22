const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    civilite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pays: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
