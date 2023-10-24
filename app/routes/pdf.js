const express = require('express')
const router = express.Router();
const { pdfCreator } = require('../controllers/pdf/pdfCreator');
const {validatorPdf} = require('../validations/validatorPdf');
const {authRequired} = require('../validations/validateToken');


router.post('/', [validatorPdf], pdfCreator);

module.exports = router;