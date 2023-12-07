const express = require('express');
const router = express.Router();
const {findAll, createAgreement} = require('../controllers/agreement');
const {validatorAgreement} = require('../validations/validatorAgreement');
const {authRequired} = require('../validations/validateToken')


router.get('/', authRequired, findAll);
router.post('/', validatorAgreement,createAgreement);

module.exports = router;