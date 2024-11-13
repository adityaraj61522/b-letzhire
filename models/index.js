// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Resume = require('./Resume');
const Education = require('./Education');
const WorkExperience = require('./WorkExperience');
const Project = require('./Projects');
const Skill = require('./Skills');
// Import other models as needed

// Define associations
User.hasMany(Resume, { foreignKey: 'userId' });
Resume.belongsTo(User, { foreignKey: 'userId' });

Resume.hasMany(Education, { foreignKey: 'resumeId' });
Education.belongsTo(Resume, { foreignKey: 'resumeId' });

Resume.hasMany(WorkExperience, { foreignKey: 'resumeId' });
WorkExperience.belongsTo(Resume, { foreignKey: 'resumeId' });

Resume.hasMany(Project, { foreignKey: 'resumeId' });
Project.belongsTo(Resume, { foreignKey: 'resumeId' });

Resume.hasMany(Skill, { foreignKey: 'resumeId' });
Skill.belongsTo(Resume, { foreignKey: 'resumeId' });

// Define other associations similarly

// Export all models and sequelize instance
module.exports = {
    User,
    Resume,
    Education,
    WorkExperience,
    Project,
    Skill,
    sequelize
    // Export other models as needed
};
