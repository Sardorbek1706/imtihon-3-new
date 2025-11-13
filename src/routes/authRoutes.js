const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

router.post('/signup', ctrl.signup);
router.post('/signin', ctrl.signin);
router.post('/refresh-token', ctrl.refreshToken);
router.get('/me', ctrl.me);
router.get('/logout', ctrl.logout);
router.post('/verify-otp', ctrl.verifyOtp);

module.exports = router;
