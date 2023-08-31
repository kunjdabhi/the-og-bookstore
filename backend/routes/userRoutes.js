const express = require('express');

const router = express.Router();
const {loginUser, signupUser} = require('../controllers/userController')

//login user
router.post('/login',loginUser);

//signup user
router.post('/signup',signupUser);


module.exports = router;