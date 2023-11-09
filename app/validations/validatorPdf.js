const {body, validationResult} = require('express-validator');

const validatorPdf = [
    body('id').exists().notEmpty().isLength({ min: 12 }).withMessage("Minimum 12 digits"),
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

module.exports.validatorPdf = validatorPdf;