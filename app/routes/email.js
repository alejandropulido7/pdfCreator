const express = require('express');
const router = express.Router();
const {sendMail} = require('../controllers/mailer');
const {validatorEmail} = require('../validations/validatorEmail');
const {uploadFile} =  require('../utils/multer');
const {authRequired} = require('../validations/validateToken');


router.post('/', [authRequired, uploadFile('pdf').single('pdf'), validatorEmail], sendMail);

module.exports = router;