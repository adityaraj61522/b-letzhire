// models/Skill.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    resumeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Skill;
