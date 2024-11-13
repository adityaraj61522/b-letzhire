// scripts/syncDb.js
const { sequelize } = require('../models');

const syncDatabase = async () => {
    try {
        // Use alter: true instead of force: true to avoid dropping tables
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();
