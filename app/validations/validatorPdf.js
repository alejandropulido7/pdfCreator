const {body, validationResult} = require('express-validator');
const express = require('express')

const validatorPdf = [
    body('dateAgreement').exists().notEmpty(),
    body('customerName').exists().notEmpty(),
    body('customerEmail').exists().notEmpty(),
    body('customerPhone').exists().notEmpty(),
    body('customerLocation').exists().notEmpty(),
    // body('requirements').exists().isArray(min = 1),
    // body('requirements[0].name').exists().notEmpty(),
    // body('requirements[0].description').exists().notEmpty(),
    // body('requirements[0].priority').exists().notEmpty(),
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