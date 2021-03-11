const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.get('/', loginController.loginUrl);

router.get('/redirectURI', loginController.redirectURI);

router.get('/userInfo/:userId', loginController.getUserInfo)

module.exports = router;