const express = require('express');
const router = express.Router();
const {findAll, createAgreement} = require('../controllers/agreement');
const {validatorAgreement} = require('../validations/validatorAgreement');


router.get('/', findAll);
router.post('/', validatorAgreement,createAgreement);

module.exports = router;