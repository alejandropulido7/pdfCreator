const express = require('express');
const router = express.Router();
const {register, login, logout} = require('../controllers/auth');
const {validatorAuthRegister, validatorAuthLogin} = require('../validations/validatorAuth')

router.post('/register', validatorAuthRegister, register);
router.post('/login', validatorAuthLogin, login);
router.post('/logout', logout);

module.exports = router;