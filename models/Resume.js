// models/Resume.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resume = sequelize.define('Resume', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    templateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Resume;
