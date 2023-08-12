const express = require('express');
const router = express.Router();

const loginControllers = require('../controllers/login');

router.post('/user-login',loginControllers.loginData);

module.exports = router;