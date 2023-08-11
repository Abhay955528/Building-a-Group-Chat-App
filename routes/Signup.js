const express = require('express');
const router = express.Router();

const SignupControllers = require('../controllers/Signup');

router.post('/user-Signup',SignupControllers.Signup);

module.exports = router;