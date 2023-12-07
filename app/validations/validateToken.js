const jwt = require('jsonwebtoken');
const {User}= require('../models/User')
const secretKey = process.env.SECRETKEY;

const authRequired = (req, res, next) => {
    const {token} = req.headers;
    if(!token) return res.status(401).json({ message: "No token"});
    jwt.verify(token, secretKey, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token"});
        req.user = user;
        next();
    })
}

const authRequiredAdmin = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({ message: "No token"});
    jwt.verify(token, secretKey, async (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token"});
        try {
            const userFound = await User.findById({_id: user.id}); 
            if(userFound.role != 'admin') return res.status(401).json({ message: "Unauthorized"});
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({message: "User not found"});
        }
    })
}

module.exports = {authRequired, authRequiredAdmin}