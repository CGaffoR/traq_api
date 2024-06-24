const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secretKey = process.env.SECRET_KEY;

const validationToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.sendStatus(404); 
        }
        req.user = user;
        next(); 
    } catch (err) {
        return res.sendStatus(403);
    }
};

module.exports = { validationToken };
