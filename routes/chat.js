const express = require('express');
const router = express.Router();
const massageControllers = require('../controllers/chat');
const userauthentication = require('../middleware/auth');

router.post('/user-addmassage',userauthentication.authenticate,massageControllers.addmassage);

router.post('/user-getmassage',userauthentication.authenticate,massageControllers.getmassage);

module.exports = router;