const express = require('express');
const router = express.Router();
const {sendMail} = require('../controllers/mailer');
const {validatorEmail} = require('../validations/validarorEmail');
const {uploadFile} =  require('../utils/multer');


router.post('/', [uploadFile('pdf').single('pdf'), validatorEmail], sendMail);

module.exports = router;