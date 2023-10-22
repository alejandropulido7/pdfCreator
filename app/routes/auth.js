const express = require('express');
const router = express.Router();
const {User}= require('../models/User')

router.post('/register', async (req, res, next) => {
    const {email, password, username} = req.body;
    try {
        const user = new User({email,password,username});
        await user.save();    
        console.log(user)
        res.send("Registered")    
    } catch (error) {
        console.log(error);
        next()
    }
});

// router.post('/register', (req, res) => {
//     const {email, password, username} = req.body;
//     res.json(req.body)
    
// });

module.exports = router;