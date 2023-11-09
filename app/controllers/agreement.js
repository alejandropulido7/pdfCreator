const {Agreement} = require('../models/Agreement')

const findAll = async (req, res) => {
    try {
        agreementsFound =  await Agreement.find({});
        res.send(agreementsFound);
    } catch (error) {
        console.log(error);
        res.status(500).json([error.message]);
    }    
};

const createAgreement = async (req, res) => {
    console.log(req.body);
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
        res.status(200).json({message: "Agreement registered to "+saveAgreement.customerEmail});
    } catch (error) {
        console.log(error);
        res.status(500).json([error.message]);
    }

}


module.exports = {findAll, createAgreement }