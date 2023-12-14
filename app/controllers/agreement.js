const {Agreement} = require('../models/Agreement')
const {User} = require('../models/User')

const findAll = async (req, res) => {
    try {
        const userFound = await User.findById({_id: req.user.id});
        if(!userFound) return res.status(401).json({ message: "invalid token"});
        let agreementsFound =  [];
        if(userFound.role == 'user'){
            agreementsFound = await Agreement.find({customerEmail: userFound.email});
        } else {
            agreementsFound = await Agreement.find({});
        }
        res.send(agreementsFound);
    } catch (error) {
        res.status(500).json([error.message]);
    }    
};

const createAgreement = async (req, res) => {
    const {dateAgreement, customerName, customerEmail, customerPhone, customerLocation, requirements, sign} = req.body;
    try {
        
        const newAgreement = new Agreement({
            dateAgreement,
            customerName,
            customerEmail,
            customerPhone,
            customerLocation,
            requirements,
            sign
        });
        const saveAgreement = await newAgreement.save();
        res.status(200).json({
            id: saveAgreement.id,
            message: "Agreement registered to "+saveAgreement.customerEmail
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }

}


module.exports = {findAll, createAgreement }