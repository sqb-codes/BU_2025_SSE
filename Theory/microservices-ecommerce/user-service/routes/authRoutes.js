const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

const { registerUser } = authController;

router.post('/register', registerUser);

module.exports = router;