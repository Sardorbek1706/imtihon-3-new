const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars')
], authController.register);

router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/protected', authMiddleware, authController.protected);
=======
const ctrl = require('../controllers/authController');

router.post('/signup', ctrl.signup);
router.post('/signin', ctrl.signin);
router.post('/refresh-token', ctrl.refreshToken);
router.get('/me', ctrl.me);
router.get('/logout', ctrl.logout);
router.post('/verify-otp', ctrl.verifyOtp);
>>>>>>> 222126396ae93864d164b26c1d673408ba07bd7c

module.exports = router;
