const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const resumeRoutes = require('./routes/resume');
const cors = require('cors');

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Your React app's URL
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Connect to DB
    sequelize.authenticate()
        .then(() => {
            console.log('Connected to MySQL database');
            return sequelize.sync();
        })
        .then(() => console.log('Database synchronized'))
        .catch(err => console.error('Unable to connect to the database:', err));
});

module.exports = app;
