const {validationResult, body} = require('express-validator');

const validatorEmail = [
    body('idAgreement').exists().notEmpty().isLength({min: 12}).withMessage("12 digits minimum"),
    body('sendTo').exists().notEmpty().isEmail(),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (err){
            res.status(403);
            res.send({errors: err.array()});
        }
    }
];

module.exports.validatorEmail = validatorEmail;