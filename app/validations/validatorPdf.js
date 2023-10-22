const {check, validationResult} = require('express-validator');
const express = require('express')

const validatorPdf = [
    check('dateAgreement').exists().notEmpty(),
    check('customerName').exists().notEmpty(),
    check('customerEmail').exists().notEmpty(),
    check('customerPhone').exists().notEmpty(),
    check('customerLocation').exists().notEmpty(),
    check('requirements').exists().isArray(min = 1),
    check('requirements[0].name').exists().notEmpty(),
    check('requirements[0].description').exists().notEmpty(),
    check('requirements[0].priority').exists().notEmpty(),
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