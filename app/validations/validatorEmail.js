const {validationResult, body} = require('express-validator');

const validatorEmail = [
    body('sendTo').exists().notEmpty(),
    body('subject').exists().notEmpty(),
    body('body').exists().notEmpty(),
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