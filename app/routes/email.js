const express = require('express');
const router = express.Router();
const {sendMail} = require('../controllers/mailer');
const {validatorEmail} = require('../validations/validatorEmail');
const {authRequired} = require('../validations/validateToken');


router.post('/', [authRequired, validatorEmail], sendMail);

module.exports = router;