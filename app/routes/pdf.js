const express = require('express')
const router = express.Router();
const { generatePdf } = require('../controllers/pdf/pdfCreator');
const {validatorPdf} = require('../validations/validatorPdf');
const {authRequired} = require('../validations/validateToken');


router.post('/', validatorPdf, generatePdf);

module.exports = router;