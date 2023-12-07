const {body, validationResult} = require('express-validator');

const validatorAgreement = [
    body('dateAgreement').exists().notEmpty(),
    body('customerName').exists().notEmpty(),
    body('customerEmail').exists().isEmail().withMessage('Not a valid e-mail address'),
    body('customerPhone').exists().notEmpty(),
    body('customerLocation').exists().notEmpty(),
    body('requirements').exists().isArray(min = 1),
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

module.exports.validatorAgreement = validatorAgreement;