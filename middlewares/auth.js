const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Bearer token

    if(!token){
        return req.status(401).json({message: 'Access token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({message: 'Invalid or expired token '});
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;