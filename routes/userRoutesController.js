const express = require('express');
const router1 = express.Router();
const {register,
       login,
       getUserDetails} = require('../controller/userController');

const validateToken = require('../middleware/validateTokenHandler');

router1.post('/register', register);

router1.post('/login', login);

router1.get('/getUserDetails', validateToken, getUserDetails);

module.exports = router1;