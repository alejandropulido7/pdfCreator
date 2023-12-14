const {User}= require('../models/User')
const bcrypt = require('bcryptjs')
const {createAccessToken} = require('../utils/jwt');

const register = async (req, res) => {
    const {email, password, username} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(userFound) res.status(400).json(['The email already registered']);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: passwordHash,
            username
        });
        const newUser = await user.save();
        
        const token = await createAccessToken({
            id: newUser._id
        });            
        res.cookie('token', token);
        res.send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });    
    } catch (error) {
        res.status(500).json([error.message]);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {

        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: "User not found"});

        const passwordIsValid = await bcrypt.compare(password, userFound.password);
        if(!passwordIsValid) return res.status(400).json({message: "Incorrect password"});
        
        const token = await createAccessToken({
            id: userFound._id
        });            
        res.send({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            token
        });    
    } catch (error) {
        res.status(500).json({ error });
    }
}

const logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    res.sendStatus(200);
}

module.exports = {register, login, logout}