const express = require('express');
const router = express.Router();

const { register, login, logout,resetPassword,forgotPassword,verifyEmail,VerifyToken } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/verify-email',verifyEmail)
router.post('/reset-password',resetPassword)
router.post('/forgot-password',forgotPassword)
router.get('/verify-user',VerifyToken)

module.exports = router;
