const express = require('express');
const router = express.Router();

const SignupControllers = require('../controllers/user');

router.post('/user-Signup',SignupControllers.SignupUser);

module.exports = router;