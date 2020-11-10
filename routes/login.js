const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.get('/', loginController.loginUrl);

router.get('/redirectURI', loginController.redirectURI);

module.exports = router;