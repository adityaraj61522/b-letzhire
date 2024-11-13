// models/Education.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    resumeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Education;
