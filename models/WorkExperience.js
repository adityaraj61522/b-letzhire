// models/WorkExperience.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkExperience = sequelize.define('WorkExperience', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    resumeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
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

module.exports = WorkExperience;
