const jwt = require('jsonwebtoken');
const blacklist = new Set(); // Simple in-memory blacklist

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (blacklist.has(token)) {
        return res.status(401).send({ error: 'Token has been invalidated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch (e) {
        console.log("e",e)
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const invalidateToken = (token) => {
    blacklist.add(token);
};

const isTokenInvalidated = (token) => {
    return blacklist.has(token);
};

module.exports = { auth, invalidateToken, isTokenInvalidated };
